import { Injectable } from "@nestjs/common";
import { RolesEnum } from "src/features/constant";
import { Merchant } from "src/features/merchant/schema/merchant.schema";
import { User } from "src/features/user/schema/user.schema";
import { IAuthUser } from "../interfaces/auth-user.interface";
import { Types, UpdateQuery, isObjectIdOrHexString } from "mongoose";
import { endOfMonth, isEqual, startOfMonth } from "date-fns";

type OperationType<T extends object> = {
  // Insert a new document
  insertOne: T;
  // Update a single document matching the filter
  updateOne: {
    filter: Record<string, unknown>; // Filter criteria (any object structure)
    update: { $set?: Partial<T>; [key: string]: any }; // Update operators with optional $set
  };
  // Update multiple documents matching the filter
  updateMany: {
    filter: Record<string, unknown>;
    update: { $set?: Partial<T>; [key: string]: any };
  };
  // Delete a single document matching the filter
  deleteOne: {
    filter: Record<string, unknown>;
  };
  // Delete multiple documents matching the filter
  deleteMany: {
    filter: Record<string, unknown>;
  };
};

type BulkOperationsIteratorType<T extends object> = {
  operations: OperationType<T>[];
  ids: Types.ObjectId[];
};

@Injectable()
export class UtilService {
  mergeUserAndAuthUser(user: User, profile: Merchant) {
    const jsonUser = JSON.parse(JSON.stringify(user));

    const jsonProfile = JSON.parse(JSON.stringify(profile));

    switch (user.role) {
      case RolesEnum.ADMIN: {
        jsonUser["admin"] = jsonProfile._id;
        break;
      }
      case RolesEnum.MERCHANT: {
        jsonUser["merchant"] = jsonProfile._id;
        delete jsonProfile._id;
        break;
      }
    }

    //Delete unnecessary fields
    delete jsonProfile._id;
    delete jsonProfile.user;
    delete jsonUser.password;
    delete jsonProfile.createdAt;
    delete jsonProfile.updatedAt;
    delete jsonUser.isTrash;

    //merge the user and merchant
    Object.assign(jsonUser, jsonProfile);

    return jsonUser;
  }

  queryBuilder(authUser: IAuthUser) {
    const query = {
      isTrash: false,
    };

    switch (authUser.role) {
      case RolesEnum.MERCHANT: {
        return {
          ...query,
          merchant: new Types.ObjectId(authUser.merchant),
        };
      }
    }
  }

  generateSixRandomNumber() {
    const minNum = 100000;
    const maxNum = 999999;
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  }

  /**
   * @description this method is used to generate bulk update query.
   *   this method is mostly perform making data for mongodb bulkWrite operation
   * @param data data to be updated
   * @param primaryId- this key is use for generate ids array from the given data
   * @param callBack
   * @returns
   */
  bulkWriteUpdateQueryBuilder<T extends object>(
    data: T[],
    primaryId: keyof T,
    //this callback is used for filter and make update data
    callBack: (data: T) => {
      filter: Record<string, string | number | Types.ObjectId>;
      data: UpdateQuery<T>;
    }
  ): { operations: Array<any>; ids: Types.ObjectId[] } {
    const bulkOperations = data.reduce(
      (accumulator: BulkOperationsIteratorType<T>, current: T) => {
        return {
          operations: [
            ...accumulator.operations,
            {
              updateOne: {
                filter: callBack(current).filter,
                update: callBack(current).data,
              },
            },
          ],
          ids: [
            ...accumulator.ids,
            !isObjectIdOrHexString(current[primaryId])
              ? new Types.ObjectId(current[primaryId] as string)
              : (current[primaryId] as Types.ObjectId),
          ],
        };
      },
      {
        operations: [],
        ids: [],
      }
    );
    return bulkOperations;
  }

  /**
   *This method check the equality of two dates except hours, minutes, and seconds
   * @param date1 {Date}
   * @param date2 {Date}
   * @returns {boolean}
   */
  isEqualDate(date1: Date, date2: Date) {
    // Parse the dates from the strings
    const leftDate = new Date(date1);
    const rightDate = new Date(date2);

    // Set hours, minutes, and seconds to 0 for both dates
    leftDate.setMinutes(0, 0, 0);
    rightDate.setMinutes(0, 0, 0);

    // Use the comparison operator (===) to check for equality
    return isEqual(leftDate, rightDate);
  }

  // Helper function to calculate start and end dates for a given month offset
  getMonthStartAndEndDates(
    date: Date,
    offset: number = 0
  ): { startDate: Date; endDate: Date } {
    const targetDate = new Date(date);
    targetDate.setMonth(targetDate.getMonth() + offset);
    return {
      startDate: startOfMonth(targetDate),
      endDate: endOfMonth(targetDate),
    };
  }
}

import { BadRequestException, Injectable } from "@nestjs/common";
import {
  BulkCreateActivityLogDto,
  CreateActivityLogDto,
} from "./dto/create-activity-log.dto";
import { InjectModel } from "@nestjs/mongoose";
import { RolesEnum, collectionNames } from "../constant";
import { ClientSession, Model, Types } from "mongoose";
import { ActivityLog } from "./schema/activity-log.schema";
import {
  CustomValidationPipe,
  IAuthUser,
  IPagination,
  PaginationOptions,
} from "../common";
import { UtilService } from "../common/services/utils.service";

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectModel(collectionNames.ACTIVITY_LOG)
    private activityLogModel: Model<ActivityLog>,

    private readonly utilService: UtilService
  ) {}

  //activity log creation
  async create(
    createActivityLogDto: CreateActivityLogDto,
    authUser: IAuthUser,
    session: ClientSession
  ): Promise<ActivityLog> {
    const { client, ...others } = createActivityLogDto;
    await CustomValidationPipe([others], CreateActivityLogDto);

    //common data for create and activity log
    const commonData = {
      user: authUser._id,
      merchant: authUser.merchant,
      ipAddress: authUser.ipAddress,
      userAgent: authUser.userAgent,
      role: authUser.role,
      branch: authUser.branch,
      ...(authUser.role === RolesEnum.RESELLER && {
        reseller: authUser.reseller,
      }),
      ...(authUser.role === RolesEnum.SUB_RESELLER && {
        subReseller: authUser.subReseller,
      }),
      ...(authUser.role === RolesEnum.EMPLOYEE && {
        employee: authUser.employee,
      }),
    };
    const activity = new this.activityLogModel({
      ...commonData,
      ...createActivityLogDto,
    });

    return activity.save({ session });
  }

  async createBulkActivityLog(
    bulkCreateActivityLogDto: BulkCreateActivityLogDto,
    authUser: IAuthUser,
    session: ClientSession
  ): Promise<ActivityLog[]> {
    const { action, description, client } = bulkCreateActivityLogDto;

    // Common data for all activity logs
    const commonData = {
      user: authUser._id,
      merchant: authUser.merchant,
      ipAddress: authUser.ipAddress,
      userAgent: authUser.userAgent,
      role: authUser.role,
      branch: authUser.branch,
      ...(authUser.role === RolesEnum.RESELLER && {
        reseller: authUser.reseller,
      }),
      ...(authUser.role === RolesEnum.SUB_RESELLER && {
        reseller: authUser.subReseller,
      }),
      ...(authUser.role === RolesEnum.EMPLOYEE && {
        reseller: authUser.employee,
      }),
      action,
      description,
    };

    // Validate and prepare the data
    const activities = client.map((clientId) => ({
      ...commonData,
      client: clientId,
    }));

    // Perform bulk insert operation
    return this.activityLogModel.insertMany(activities, { session });
  }

  async createLoginActivity(
    createActivityLogDto: CreateActivityLogDto
  ): Promise<ActivityLog> {
    await CustomValidationPipe([createActivityLogDto], CreateActivityLogDto);
    //common data for create and activity log

    const activity = this.activityLogModel.create({
      ...createActivityLogDto,
    });

    return activity;
  }

  activityLogData(
    oldData: any,
    newData: any,
    module: string,
    isNew = false
  ): any {
    const data = [];

    if (isNew) {
      data.push({
        module,
        old: {},
        new: JSON.parse(JSON.stringify(newData)),
      });
    } else {
      //recursively detect changes for nested objects
      const recursivelyDetectChanges = (oldObj: any, newObj: any) => {
        const oldValues = {};
        const newValues = {};

        for (const key in newObj) {
          if (Object.prototype.hasOwnProperty.call(oldObj, key)) {
            if (key === "__v" || key === "createdAt" || key === "updatedAt")
              continue;

            const oldDataValue = oldObj[key];
            const newDataValue = newObj[key];

            if (this.isObject(oldDataValue) && this.isObject(newDataValue)) {
              const { old, new: nestedOldValues } = recursivelyDetectChanges(
                oldDataValue,
                newDataValue
                // key,
              );
              if (Object.keys(old).length > 0) {
                oldValues[key] = old;
                newValues[key] = nestedOldValues;
              }
            } else {
              const oldValue = this.convertToString(oldDataValue);
              const newValue = this.convertToString(newDataValue);

              if (oldValue !== newValue) {
                oldValues[key] = oldDataValue;
                newValues[key] = newDataValue;
              }
            }
          }
        }

        return { old: oldValues, new: newValues };
      };

      if (oldData) {
        oldData = JSON.parse(JSON.stringify(oldData));
        const { old, new: nestedOldValues } = recursivelyDetectChanges(
          oldData,
          newData
        );
        if (Object.keys(old).length > 0) {
          data.push({
            module,
            old,
            new: nestedOldValues,
          });
        }
      }
    }
    return data;
  }

  isObject(value: any) {
    return typeof value === "object" && value !== null;
  }

  convertToString(value: any) {
    return value.toString();
  }

  async findByClientID(
    pagination: IPagination,
    clientId: Types.ObjectId,
    authUser: IAuthUser
  ): Promise<{
    activityLog: ActivityLog[];
    pagination: PaginationOptions;
  }> {
    const query: any = {
      ...this.utilService.queryBuilder(authUser),
      client: clientId,
    };
    delete query.isTrash;

    const { page, limit, order } = pagination;
    const totalDocument = await this.activityLogModel.countDocuments(query);
    const activityLog = await this.activityLogModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ clientId: order === "asc" ? 1 : -1 });

    return {
      activityLog: activityLog,
      pagination: {
        currentPage: page,
        totalPage: Math.ceil(totalDocument / limit),
        allDataCount: totalDocument,
      },
    };
  }
}

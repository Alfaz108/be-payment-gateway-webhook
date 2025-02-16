import { Injectable } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { collectionNames } from '../constant';
import { ClientSession, Model, Types } from 'mongoose';
import { CustomValidationPipe, IAuthUser } from '../common';
import { AdminActivityLog } from './schema/admin-activity-log.schema';
import { CreateAdminActivityLogDto } from './dto/create-admin-activity-log.dto';
import { CreateLoginActivityLogDto } from './dto/CreateLoginActivityLogDto';

@Injectable()
export class AdminActivityLogService {
    constructor(
        @InjectModel(collectionNames.ADMIN_ACTIVITY_LOG)
        private adminActivityLogModel: Model<AdminActivityLog>,
    ) {}

    //activity log creation
    async createAdminActivity(
        createAdminActivityLogDto: CreateAdminActivityLogDto,
        authUser: IAuthUser,
        session: ClientSession,
    ): Promise<AdminActivityLog> {
        await CustomValidationPipe([createAdminActivityLogDto], CreateActivityLogDto);
        //common data for create and activity log
        const commonData = {
            user: authUser._id,
            admin: authUser.admin,
            role: authUser.role,
        };

        const adminActivity = new this.adminActivityLogModel({
            ...commonData,
            ...createAdminActivityLogDto,
        });
        return adminActivity.save({ session });
    }

    async createLoginActivity(createLoginActivityLogDto: CreateLoginActivityLogDto): Promise<AdminActivityLog> {
        //common data for create and activity log

        const activity = new this.adminActivityLogModel(createLoginActivityLogDto);
        const savedActivity = await activity.save();

        return activity;
    }

    activityLogData(oldData: any, newData: any, module: string, isNew = false): any {
        const data = [];

        if (isNew) {
            data.push({
                module,
                old: JSON.parse(JSON.stringify(oldData)),
                new: JSON.parse(JSON.stringify(newData)),
            });
        } else {
            //recursively detect changes for nested objects
            const recursivelyDetectChanges = (oldObj: any, newObj: any) => {
                const oldValues = {};
                const newValues = {};

                for (const key in newObj) {
                    if (Object.prototype.hasOwnProperty.call(oldObj, key)) {
                        if (key === '__v' || key === 'createdAt' || key === 'updatedAt') continue;

                        const oldDataValue = oldObj[key];
                        const newDataValue = newObj[key];

                        if (this.isObject(oldDataValue) && this.isObject(newDataValue)) {
                            const { old, new: nestedOldValues } = recursivelyDetectChanges(
                                oldDataValue,
                                newDataValue,
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
                const { old, new: nestedOldValues } = recursivelyDetectChanges(oldData, newData);
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
        return typeof value === 'object' && value !== null;
    }

    convertToString(value: any) {
        return value.toString();
    }

    findAll(merchant: Types.ObjectId): Promise<AdminActivityLog[]> {
        return this.adminActivityLogModel.find({ merchant }).exec();
    }
}

import { Types } from 'mongoose';
import { DEVICE_ENUM, RolesEnum } from 'src/features/constant';

export interface IAuthUser {
    _id: Types.ObjectId;
    merchant?: Types.ObjectId;
    branch?: Types.ObjectId;
    role?: RolesEnum;
    ipAddress?: string;
    userAgent?: string;
    device?: DEVICE_ENUM;
    reseller?: Types.ObjectId;
    subReseller?: Types.ObjectId;
    employee?: Types.ObjectId;
    admin?: Types.ObjectId;
    client?: Types.ObjectId;
    distributor?: Types.ObjectId;
    iat?: number;
}

export interface IUserLoginInfo {
    ipAddress: string;
    userAgent: string;
    device: DEVICE_ENUM;
    origin: string;
}

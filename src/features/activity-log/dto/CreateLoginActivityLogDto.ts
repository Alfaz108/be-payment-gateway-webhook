import { IsNotEmpty, IsString, IsArray, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

import { ACTIVITY_LOG_ENUM } from 'src/features/constant';

export class CreateLoginActivityLogDto {
    @IsString()
    @IsEnum(ACTIVITY_LOG_ENUM)
    action: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    merchant?: Types.ObjectId;

    @IsOptional()
    @IsString()
    reseller?: Types.ObjectId;

    @IsOptional()
    @IsString()
    subReseller?: Types.ObjectId;

    @IsOptional()
    @IsString()
    employee?: Types.ObjectId;

    @IsString()
    @IsOptional()
    ipAddress?: string;

    @IsString()
    @IsOptional()
    userAgent?: string;

    @IsString()
    @IsOptional()
    device?: string;
}

import { IsNotEmpty, IsString, IsEnum, IsArray, ValidateNested, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

import { ACTIVITY_LOG_ENUM } from 'src/features/constant';

class DataDto {
    @IsString()
    @IsNotEmpty()
    module: string;

    @IsNotEmpty()
    old: object;

    @IsNotEmpty()
    new: object;
}

export class CreateAdminActivityLogDto {
    @IsString()
    @IsEnum(ACTIVITY_LOG_ENUM)
    action: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    data: DataDto[];

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsMongoId()
    merchant?: Types.ObjectId;
}

import { IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CommonDto {
    @IsOptional()
    @IsMongoId()
    user?: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    merchant?: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    reseller?: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    subReseller?: Types.ObjectId;
}

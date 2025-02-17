import {
  IsEnum,
  IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Types } from "mongoose";
import { IsValidMobile } from "src/features/common/decorator/is-phone-number.decorator";
import { RolesEnum, USER_STATUS } from "src/features/constant";

export class CreateUserDto {
  @IsNotEmpty({ message: "User name is required" })
  @IsString()
  mobile: string;

  @IsString()
  name: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString()
  password: string;

  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(USER_STATUS)
  status: USER_STATUS;

  @IsOptional()
  @IsMongoId()
  merchant?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  employee?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  reseller?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  subReseller?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  client?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  distributor?: Types.ObjectId;
}

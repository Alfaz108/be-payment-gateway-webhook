import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { CommonDto } from "src/features/common";
import { Avatar } from "src/features/common/validation/create-person.dto";
import { USER_STATUS } from "src/features/constant";

export class CreateMerchantDto extends CommonDto {
  @IsNotEmpty({ message: "Company name is required" })
  @IsString({ message: "Company name must be a string" })
  companyName: string;

  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be valid" })
  name: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @Length(6, 6, { message: "Password must be exactly 6 characters long" })
  password: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString({ message: "Division must be valid" })
  division: string;

  @IsOptional()
  @IsString({ message: "District must be valid" })
  district: string;

  @IsOptional()
  @IsString({ message: "Thana must be valid" })
  thana: string;

  @IsOptional()
  @IsString({ message: "Address must be valid" })
  address: string;

  @ValidateNested()
  @Type(() => Avatar)
  @IsOptional()
  avatar: Avatar;

  @ValidateNested()
  @Type(() => Avatar)
  @IsOptional()
  nidFontSide?: Avatar;

  @ValidateNested()
  @Type(() => Avatar)
  @IsOptional()
  nidBackSide?: Avatar;

  @IsOptional()
  @IsEnum(USER_STATUS)
  merchantStatus: USER_STATUS;
}

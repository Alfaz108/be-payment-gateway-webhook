import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Types } from "mongoose";

import { CommonDto } from "src/features/common/validation/common.dto";
import { PAYMENT_METHODS_ENUM, PAYMENT_STATUS } from "src/features/constant";

export class BkashDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  appSecret?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  appKey?: string;

  @IsOptional()
  @IsBoolean()
  isTokenized?: boolean;

  @IsOptional()
  @IsString()
  callbackUrl?: boolean;
}

export class SslCommerceDto {
  @IsOptional()
  @IsString()
  storeId?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  ipn?: string;
}

export class CreatePaymentDto extends CommonDto {
  @IsNotEmpty()
  @IsString()
  PaymentAppId: Types.ObjectId;

  @IsOptional()
  @IsEnum(PAYMENT_STATUS)
  paymentStatus: string;

  @IsNotEmpty()
  @IsEnum(PAYMENT_METHODS_ENUM)
  paymentMechod: string;

  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  intent: string;

  @IsNotEmpty()
  @IsString()
  reciver: string;

  @IsOptional()
  @Type(() => BkashDto)
  bkash?: BkashDto;

  @IsOptional()
  @Type(() => SslCommerceDto)
  sslCommerce?: SslCommerceDto;
}

import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class ExecuteBkashPaymentDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  appSecret: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  appKey: string;

  @IsNotEmpty()
  @IsBoolean()
  isTokenized: boolean;

  @IsNotEmpty()
  @IsString()
  paymentID: string;
}

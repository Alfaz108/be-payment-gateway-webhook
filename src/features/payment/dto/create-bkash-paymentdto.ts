import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBkashPaymentDto {
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

  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  intent: string;

  @IsNotEmpty()
  @IsString()
  reciver: string;
}

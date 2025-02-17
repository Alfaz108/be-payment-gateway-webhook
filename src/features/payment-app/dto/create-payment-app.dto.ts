import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { CommonDto } from "src/features/common/validation/common.dto";
import { USER_STATUS } from "src/features/constant";
import { PAY_HEAD_TYPE } from "src/features/constant/enums/payhead.enum";
import { APP_STATUS } from "src/features/constant/enums/status.enum";

export class CreatePaymentAppDto extends CommonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(APP_STATUS)
  status: string;
}

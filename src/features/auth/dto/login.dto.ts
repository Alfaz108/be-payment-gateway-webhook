import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { IsValidMobile } from "src/features/common/decorator/is-phone-number.decorator";

export class LoginDto {
  @IsNotEmpty()
  @IsValidMobile()
  mobile: string;

  @IsNotEmpty()
  @IsString({ message: "Invalid password" })
  password: string;
}

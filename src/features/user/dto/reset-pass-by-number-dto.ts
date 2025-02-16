import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidMobile } from 'src/features/common/decorator/is-phone-number.decorator';

export class ResetPasswordByNumberDto {
    @IsNotEmpty({ message: 'mobile is required' })
    @IsValidMobile()
    mobile: string;
}

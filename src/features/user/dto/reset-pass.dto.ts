import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    currentPassword: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    newPassword: string;
}

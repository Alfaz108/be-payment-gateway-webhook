import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { MESSAGES_TYPE } from 'src/features/constant/enums/message-type.enum';
import { CommonDto } from './common.dto';

export class CommonMessageDto extends CommonDto {
    @IsOptional()
    @IsBoolean()
    sendConfirmation?: boolean;

    @IsOptional()
    @IsEnum(MESSAGES_TYPE)
    messageType?: MESSAGES_TYPE;

    @IsOptional()
    @IsString()
    body?: string;

    @IsOptional()
    @IsString()
    title?: string;
}

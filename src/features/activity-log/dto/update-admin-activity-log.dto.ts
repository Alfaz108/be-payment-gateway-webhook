import { PartialType } from '@nestjs/swagger';
import { CreateAdminActivityLogDto } from './create-admin-activity-log.dto';

export class UpdateAdminActivityLogDto extends PartialType(CreateAdminActivityLogDto) {}

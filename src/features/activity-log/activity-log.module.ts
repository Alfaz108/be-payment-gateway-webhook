import { Module } from "@nestjs/common";
import { ActivityLogService } from "./activity-log.service";
import { ActivityLogController } from "./activity-log.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { collectionNames } from "../constant";
import { ActivityLogSchema } from "./schema/activity-log.schema";
import { AdminActivityLogSchema } from "./schema/admin-activity-log.schema";
import { AdminActivityLogService } from "./admin-activity-log.service";
import { UtilService } from "../common/services/utils.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: collectionNames.ACTIVITY_LOG,
        schema: ActivityLogSchema,
      },

      {
        name: collectionNames.ADMIN_ACTIVITY_LOG,
        schema: AdminActivityLogSchema,
      },
    ]),
  ],
  controllers: [ActivityLogController],
  providers: [ActivityLogService, AdminActivityLogService, UtilService],
  exports: [ActivityLogService, AdminActivityLogService],
})
export class ActivityLogModule {}

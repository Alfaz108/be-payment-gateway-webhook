import { Controller, Get, Param } from "@nestjs/common";
import { ActivityLogService } from "./activity-log.service";
import {
  AllRoles,
  AuthUser,
  IAuthUser,
  IPagination,
  Pagination,
  PaginationOptions,
  Roles,
} from "../common";
import { Types } from "mongoose";
import { ActivityLog } from "./schema/activity-log.schema";

@Controller("activity-log")
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get("client/:clientId")
  async findByClientID(
    @Pagination() pagination: IPagination,
    @AuthUser() authUser: IAuthUser,
    @Param("clientId") clientId: Types.ObjectId
  ): Promise<{ activityLog: ActivityLog[]; pagination: PaginationOptions }> {
    const data = await this.activityLogService.findByClientID(
      pagination,
      clientId,
      authUser
    );
    return data;
  }
}

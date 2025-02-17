import { Injectable } from "@nestjs/common";
import { CreatePaymentAppDto } from "./dto/create-payment-app.dto";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { ACTIVITY_LOG_ENUM, collectionNames } from "src/features/constant";
import { PaymentApp } from "./schema/payment-app.schema";
import { Connection, Model } from "mongoose";
import { IAuthUser } from "src/features/common";
import { ActivityLogService } from "src/features/activity-log/activity-log.service";
import { UtilService } from "src/features/common/services/utils.service";
import { error } from "console";
import { Types } from "mongoose";

@Injectable()
export class PaymentAPPService {
  constructor(
    @InjectModel(collectionNames.PAYMENT_APP)
    private readonly paymentModel: Model<PaymentApp>,
    @InjectConnection() private readonly connection: Connection,
    private readonly activityLogService: ActivityLogService,
    private readonly utilService: UtilService
  ) {}
  async create(
    authUser: IAuthUser,
    createPaymentAppDto: CreatePaymentAppDto
  ): Promise<PaymentApp> {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const paymentApp = new this.paymentModel({
        ...createPaymentAppDto,
        merchant: authUser.merchant,
      });

      const paymentAppData = await paymentApp.save({ session });

      //@ Activity log
      const activity = this.activityLogService.activityLogData(
        null,
        paymentAppData,
        "paymentApp",
        true
      );
      await this.activityLogService.create(
        {
          action: ACTIVITY_LOG_ENUM.CREATE,
          description: `created a payment name: ${paymentAppData.name}`,
          data: activity,
        },
        authUser,
        session
      );

      await session.commitTransaction();
      return paymentAppData;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}

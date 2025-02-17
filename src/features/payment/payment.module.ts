import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { collectionNames } from "src/features/constant";
import { ActivityLogModule } from "src/features/activity-log/activity-log.module";
import { UtilService } from "src/features/common/services/utils.service";
import { PaymentSchema } from "./schema/payment.schema";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { BkashPaymentService } from "./bkash-payment.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: collectionNames.PAYMENT, schema: PaymentSchema },
    ]),
    ActivityLogModule,
  ],

  controllers: [PaymentController],
  providers: [PaymentService, UtilService, BkashPaymentService],
})
export class PaymentModule {}

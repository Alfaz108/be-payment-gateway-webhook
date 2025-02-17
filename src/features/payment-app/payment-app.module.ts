import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { collectionNames } from "src/features/constant";
import { ActivityLogModule } from "src/features/activity-log/activity-log.module";
import { UtilService } from "src/features/common/services/utils.service";
import { PaymentAppSchema } from "./schema/payment-app.schema";
import { PaymentAppController } from "./payment-app.controller";
import { PaymentAPPService } from "./payment-app.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: collectionNames.PAYMENT_APP, schema: PaymentAppSchema },
    ]),
    ActivityLogModule,
  ],

  controllers: [PaymentAppController],
  providers: [PaymentAPPService, UtilService],
})
export class PaymentAppModule {}

import { Module } from "@nestjs/common";
import { MerchantService } from "./merchant.service";
import { MerchantController } from "./merchant.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { MerchantSchema } from "./schema/merchant.schema";
import { collectionNames } from "../constant";
import { UserModule } from "../user/user.module";

import { UtilService } from "../common/services/utils.service";

import { ActivityLogModule } from "../activity-log/activity-log.module";

import { MulterModule } from "../common";
import { MerchantSerialService } from "./merchant-serial.service";
import { MerchantSerialSchema } from "./schema/merchant-serial-schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: collectionNames.MERCHANT, schema: MerchantSchema },
      { name: collectionNames.MERCHANT_SERIAL, schema: MerchantSerialSchema },
    ]),
    MulterModule.register({
      acceptedMimeTypes: ["image/jpeg", "image/png", "image/jpg"],
      destination: "./uploads/images",
      errorMessages: "Only jpeg,png and jpg files are allowed.",
      maxFileSize: 1024 * 1024 * 10, //2MB
    }),
    UserModule,

    ActivityLogModule,
  ],
  controllers: [MerchantController],
  providers: [MerchantService, UtilService, MerchantSerialService],
  exports: [MerchantService],
})
export class MerchantModule {}

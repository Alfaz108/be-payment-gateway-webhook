import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { appConfig } from "../config";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";
import { MerchantModule } from "../merchant/merchant.module";
import { MulterModule } from "../common/module/multer/multure.module";
import { UtilService } from "../common/services/utils.service";

import { MongooseModule } from "@nestjs/mongoose";
import { ActivityLogModule } from "../activity-log/activity-log.module";

@Module({
  imports: [
    MongooseModule.forFeature([]),
    JwtModule.registerAsync({
      useFactory() {
        const config = appConfig();
        return {
          secret: config.jwt_secret,
          signOptions: {
            expiresIn: config.access_token_expiration_minute,
          },
        };
      },
    }),
    MulterModule.register({
      acceptedMimeTypes: ["image/jpeg", "image/png", "image/jpg"],
      destination: "./uploads/images",
      errorMessages: "Only jpeg,png and jpg files are allowed.",
      maxFileSize: 1024 * 1024 * 10, //2MB
    }),

    UserModule,
    MerchantModule,

    ActivityLogModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, UtilService],
})
export class AuthModule {}

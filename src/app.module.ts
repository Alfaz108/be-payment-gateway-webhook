import * as Joi from "@hapi/joi";
import * as path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { appConfig } from "./features/config/app.config";
import { UserModule } from "./features/user/user.module";
import { CommonModule } from "./features/common/common.module";
import { AuthModule } from "./features/auth/auth.module";
import { MerchantModule } from "./features/merchant/merchant.module";
import { ActivityLogModule } from "./features/activity-log/activity-log.module";
import { ValidateObjectIdPipe } from "./features/common/validation-helper/validate-objectid.pipe";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    // ThrottlerModule.forRoot([
    //     {
    //         ttl: 60000,
    //         limit: 100,
    //     },
    // ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        MONGODB_URL: Joi.required(),
        JWT_SECRET: Joi.string().required(),
        SERVER_PORT: Joi.number().required(),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),
        MASTER_PASSWORD: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 5000,
    }),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
      logging: false,
      fallbacks: {
        "en-*": "en",
        "bn-*": "bn",
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
      ],
    }),

    ScheduleModule.forRoot(),
    CommonModule,
    UserModule,
    AuthModule,

    MerchantModule,

    ActivityLogModule,
  ],

  controllers: [],
  providers: [ValidateObjectIdPipe],
})
export class AppModule {}

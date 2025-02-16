import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "./logger/logger/logger.middleware";
import { JwtAuthGuard } from "../auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { PermissionGuard } from "../auth/permission.guard";
import { ThrottlerGuard } from "@nestjs/throttler";

//this module is used for global middleware and global guard
@Module({
  imports: [],

  providers: [
    // {
    //     provide: APP_GUARD,
    //     useClass: ThrottlerGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}

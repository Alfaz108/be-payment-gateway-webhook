import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { collectionNames } from "../constant";
import { UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UtilService } from "../common/services/utils.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: collectionNames.USER, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UtilService],
  exports: [UserService],
})
export class UserModule {}

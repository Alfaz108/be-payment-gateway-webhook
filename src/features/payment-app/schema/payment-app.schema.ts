import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommonSchema } from "src/features/common/schema/common.schema";
import { PAY_HEAD_TYPE } from "src/features/constant/enums/payhead.enum";
import { APP_STATUS } from "src/features/constant/enums/status.enum";

@Schema({ timestamps: true, versionKey: false })
export class PaymentApp extends CommonSchema {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, enum: APP_STATUS, default: APP_STATUS.ACTIVE })
  status: APP_STATUS;
}

export const PaymentAppSchema = SchemaFactory.createForClass(PaymentApp);

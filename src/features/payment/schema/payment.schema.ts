import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { CommonSchema } from "src/features/common/schema/common.schema";
import { PAYMENT_METHODS_ENUM, PAYMENT_STATUS } from "src/features/constant";
import { PAY_HEAD_TYPE } from "src/features/constant/enums/payhead.enum";
import {
  APP_STATUS,
  PACKAGE_STATUS,
} from "src/features/constant/enums/status.enum";

@Schema({ timestamps: true, versionKey: false })
export class Payment extends CommonSchema {
  @Prop({ type: Types.ObjectId, required: true })
  PaymentAppId: Types.ObjectId;

  @Prop({ type: String, enum: PAYMENT_STATUS, required: true })
  paymentStatus: PAYMENT_STATUS;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, enum: PAYMENT_METHODS_ENUM, required: true })
  paymentMechod: PAYMENT_METHODS_ENUM;

  @Prop({ type: String, required: true })
  paymentNumber: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

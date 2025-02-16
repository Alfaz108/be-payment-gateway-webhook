import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class MerchantSerial extends Document {
  @Prop({ type: Number, required: true })
  serial: number;

  @Prop({ type: String })
  prefix: string;
}

export const MerchantSerialSchema =
  SchemaFactory.createForClass(MerchantSerial);

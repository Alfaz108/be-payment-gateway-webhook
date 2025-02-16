import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { IsTrashSchema } from "src/features/common/schema/isTrash.schema";
import { Image } from "src/features/common/schema/person.schema";
import { USER_STATUS } from "src/features/constant";

@Schema({ versionKey: false, timestamps: true })
export class Merchant extends IsTrashSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  user: Types.ObjectId;

  @Prop({ type: Number, required: true })
  serial: number;

  @Prop({ type: String, required: true })
  companyName: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  mobile: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  nid: string;

  @Prop({ type: String })
  division: string;

  @Prop({ type: String })
  district: string;

  @Prop({ type: String })
  thana: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Object })
  avatar: Image;

  @Prop({ type: Object })
  logo: Image;

  @Prop({ type: Object })
  nidFontSide: Image;

  @Prop({ type: Object })
  nidBackSide: Image;

  @Prop({
    type: String,
    required: true,
    enum: USER_STATUS,
    default: USER_STATUS.INACTIVE,
  })
  merchantStatus: USER_STATUS;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);

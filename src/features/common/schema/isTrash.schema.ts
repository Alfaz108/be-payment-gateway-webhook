import { Prop } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Types } from "mongoose";

export class IsTrashSchema extends Document {
  @Prop({ type: Boolean, default: false })
  isTrash: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  deletedBy: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  restoreBy: Types.ObjectId;

  @Prop({ type: Date })
  deletedDate: Date;

  @Prop({ type: Date })
  restoreDate: Date;
}

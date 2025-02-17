import { Prop } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { collectionNames } from "src/features/constant";
import { IsTrashSchema } from "./isTrash.schema";

export class CommonSchema extends IsTrashSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionNames.USER,
  })
  user: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionNames.MERCHANT,
    required: true,
    index: true,
  })
  merchant: Types.ObjectId;
}

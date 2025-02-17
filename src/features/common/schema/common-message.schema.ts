import { Prop } from "@nestjs/mongoose";
import { MESSAGES_TYPE } from "src/features/constant/enums/message-type.enum";
import { CommonSchema } from "./common.schema";

class SelectedData {
  @Prop({ type: String, default: "" })
  value: string;

  @Prop({ type: Number })
  index: number;

  @Prop({ type: Number })
  endIndex: number;
}

export class CommonMessage extends CommonSchema {
  @Prop({ type: String })
  title: string;

  @Prop({
    type: String,
    enum: MESSAGES_TYPE,
    default: MESSAGES_TYPE.NON_MASKING,
  })
  type: MESSAGES_TYPE;

  @Prop({ type: Boolean, default: false })
  sendConfirmation: Boolean;

  @Prop({ type: String, default: "" })
  body: string;

  @Prop({ type: Array<SelectedData>, default: [] })
  selectedData: SelectedData[];
}

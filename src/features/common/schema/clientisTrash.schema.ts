import { Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Types } from 'mongoose';

export class ClientIsTrashSchema extends Document {
    @Prop({ type: Boolean, default: false })
    isTrash: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    isDeleted: Types.ObjectId;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ACTIVITY_LOG_ENUM, RolesEnum, collectionNames } from 'src/features/constant';

class Data {
    @Prop({ type: String, required: true })
    module: string;

    @Prop({ type: Object, required: true })
    old: object;

    @Prop({ type: Object, required: true })
    new: object;
}

@Schema({ timestamps: true, versionKey: false })
export class AdminActivityLog extends Document {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.USER,
    })
    user: Types.ObjectId;
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.MERCHANT,
    })
    merchant: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.RESELLER,
    })
    reseller: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.EMPLOYEE,
    })
    employee: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.SUB_RESELLER,
    })
    subReseller: Types.ObjectId;

    @Prop({ type: Array<Data> })
    data: Data[];

    @Prop({
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.ADMIN,
    })
    admin: Types.ObjectId;

    @Prop({ type: String, enum: RolesEnum })
    role: string;

    @Prop({
        type: String,
        required: true,
        enum: ACTIVITY_LOG_ENUM,
    })
    action: string;

    @Prop({
        required: true,
        type: String,
    })
    description: string;

    @Prop({
        type: String,
    })
    ipAddress: string;

    @Prop({
        type: String,
    })
    userAgent: string;

    @Prop({
        type: String,
    })
    device: string;
}

export const AdminActivityLogSchema = SchemaFactory.createForClass(AdminActivityLog);

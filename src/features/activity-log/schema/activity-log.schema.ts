import mongoose, { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
export class ActivityLog extends Document {
    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.USER,
    })
    user: Types.ObjectId;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.MERCHANT,
    })
    merchant: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.BRANCH,
    })
    branch?: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.RESELLER,
    })
    reseller?: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.SUB_RESELLER,
    })
    subReseller?: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.EMPLOYEE,
    })
    employee?: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.CLIENT,
    })
    client?: Types.ObjectId;

    @Prop({ type: String, enum: RolesEnum })
    role: string;

    @Prop({
        type: String,
        required: true,
        enum: ACTIVITY_LOG_ENUM,
    })
    action: string;

    @Prop({ type: Array<Data> })
    data: Data[];

    @Prop({
        required: true,
        type: String,
    })
    description: string;

    @Prop({
        required: true,
        type: String,
    })
    ipAddress: string;

    @Prop({
        required: true,
        type: String,
    })
    userAgent: string;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);

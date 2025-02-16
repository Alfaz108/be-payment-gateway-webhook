import mongoose, { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RolesEnum, USER_STATUS, collectionNames } from 'src/features/constant';

@Schema({ versionKey: false, timestamps: true }) // Timestamps will create both createdAt and updatedAt automatically
export class User extends Document {
    @Prop({ type: String, required: true, trim: true })
    mobile: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String })
    name: string;

    @Prop({
        type: String,
        enum: RolesEnum,
        required: true,
    })
    role: RolesEnum;

    @Prop({
        type: String,
        enum: USER_STATUS,
        default: USER_STATUS.ACTIVE,
    })
    status: USER_STATUS;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.ADMIN,
    })
    admin: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.DISTRIBUTOR,
    })
    distributor: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.DISTRIBUTOR_AGENT,
    })
    distributorAgent: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.MERCHANT,
    })
    merchant: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.EMPLOYEE,
    })
    employee: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.RESELLER,
    })
    reseller: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.SUB_RESELLER,
    })
    subReseller: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.CLIENT,
    })
    client: Types.ObjectId;

    @Prop({ type: String })
    originURL: string;

    updatedAt: Date;

    @Prop({ type: Date })
    passwordUpdatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
});

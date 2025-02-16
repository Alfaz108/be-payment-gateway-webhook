import { Prop } from '@nestjs/mongoose';
import { CommonSchema } from './common.schema';

export class Reference {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    mobile: string;

    @Prop({ type: String })
    address: string;
}

export class Image {
    @Prop({ type: String })
    url: string;

    @Prop({ type: String })
    publicId: string;

    @Prop({ type: String })
    id: string;
}

export class Person extends CommonSchema {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, trim: true })
    mobile: string;

    // @Prop({
    //     type: String,
    //     required: true,
    //     trim: true,
    //     validate: {
    //         validator: function (v: string) {
    //             const phoneNumber = parsePhoneNumberFromString(v);
    //             return phoneNumber && phoneNumber.isValid();
    //         },
    //         message: (props: any) => `${props.value} is not a valid international phone number!`,
    //     },
    // })
    // mobile: string;

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

    @Prop({ type: Reference })
    reference: Reference;

    @Prop({ type: Object })
    avatar: Image;

    @Prop({ type: String })
    nidPhoto: string;
}

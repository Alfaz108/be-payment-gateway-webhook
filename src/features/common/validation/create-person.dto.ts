import { IsString, IsOptional, ValidateNested, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CommonDto } from './common.dto';
import { IsValidMobile } from '../decorator/is-phone-number.decorator';

export class Reference {
    @IsOptional()
    @IsString({ message: 'Name must be valid' })
    name: string;

    @IsOptional()
    @IsValidMobile()
    mobile: string;

    @IsOptional()
    @IsString({ message: 'Address must be valid' })
    address: string;
}
export class Avatar {
    @IsOptional()
    @IsString({ message: 'Avatar must be valid' })
    url: string;

    @IsOptional()
    @IsString({ message: 'Avatar must be valid' })
    publicId: string;

    @IsOptional()
    @IsString({ message: 'Avatar must be valid' })
    id: string;
}

export class PersonDto extends CommonDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be valid' })
    name: string;

    @IsNotEmpty({ message: 'Mobile is required' })
    @IsValidMobile()
    mobile: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString({ message: 'NID must be valid' })
    @MinLength(7, { message: 'NID must be valid' })
    @MaxLength(17, { message: 'NID must be valid' })
    nid: string;

    @IsOptional()
    @IsString({ message: 'Division must be valid' })
    division: string;

    @IsOptional()
    @IsString({ message: 'District must be valid' })
    district: string;

    @IsOptional()
    @IsString({ message: 'Thana must be valid' })
    thana: string;

    @IsOptional()
    @IsString({ message: 'Address must be valid' })
    address: string;

    @ValidateNested()
    @Transform(({ value }) => {
        if (typeof value === 'string' && value.length > 0) {
            return JSON.parse(value);
        }
        return value;
    })
    @Type(() => Reference)
    @IsOptional()
    reference: Reference;

    @ValidateNested()
    @Type(() => Avatar)
    @IsOptional()
    avatar: Avatar;

    @IsOptional()
    @IsString({ message: 'NID photo must be valid' })
    nidPhoto: string;
}

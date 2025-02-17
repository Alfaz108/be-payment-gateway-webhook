import { PartialType } from "@nestjs/swagger";
import { CreatePaymentAppDto } from "./create-payment-app.dto";

export class UpdatePaymentAppDto extends PartialType(CreatePaymentAppDto) {}

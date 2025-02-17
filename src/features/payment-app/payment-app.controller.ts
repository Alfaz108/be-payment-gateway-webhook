import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from "@nestjs/common";
import { PaymentAPPService } from "./payment-app.service";
import { AuthUser, IAuthUser, Roles } from "src/features/common";
import { RolesEnum } from "src/features/constant";
import { CreatePaymentAppDto } from "./dto/create-payment-app.dto";

@Controller("payment-app")
export class PaymentAppController {
  constructor(private readonly paymentAPPService: PaymentAPPService) {}

  @Post()
  @Roles([RolesEnum.MERCHANT])
  async createPaymentApp(
    @Body() createPaymentAppDto: CreatePaymentAppDto,
    @AuthUser() authUser: IAuthUser
  ) {
    const data = await this.paymentAPPService.create(
      authUser,
      createPaymentAppDto
    );

    return { data, message: "Payment App Create Successfully" };
  }
}

import { Body, Controller, Param, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { AuthUser, IAuthUser, Roles } from "../common";
import { RolesEnum } from "../constant";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { ExecuteBkashPaymentDto } from "./dto/execute-bkash.dto";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("create")
  @Roles([RolesEnum.MERCHANT])
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @AuthUser() authUser: IAuthUser
  ) {
    const data = await this.paymentService.create(authUser, createPaymentDto);

    return { data, message: "Payment Create Successfully" };
  }

  @Post("bkash/execute")
  @Roles([RolesEnum.MERCHANT])
  async executePayment(
    @Body() executeBkashPaymentDto: ExecuteBkashPaymentDto,
    @AuthUser() authUser: IAuthUser
  ) {
    const data = await this.paymentService.execute(
      authUser,
      executeBkashPaymentDto
    );

    return { data, message: "Payment Successfully" };
  }
}

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Public } from "../common";
import { RegistrationDto } from "./dto/registration.dto";

import { MerchantService } from "../merchant/merchant.service";
import { Merchant } from "../merchant/schema/merchant.schema";
import { UserLginInfo } from "../common/decorator/get-auth-user.decorator";
import { IUserLoginInfo } from "../common/interfaces/auth-user.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly merchantService: MerchantService
  ) {}

  @Post("/signup")
  @Public()
  async registration(
    @Body() registrationDto: RegistrationDto
  ): Promise<{ data: Merchant; message: string }> {
    console.log({ registrationDto });
    const data = await this.merchantService.create(registrationDto);
    return { data, message: "Registration Successful" };
  }

  @HttpCode(HttpStatus.OK)
  @Post("/login")
  @Public()
  async login(
    @Body() loginDto: LoginDto,
    @UserLginInfo() userLginInfo: IUserLoginInfo
  ) {
    const res = await this.authService.logIn(loginDto, userLginInfo);
    return { data: res, message: "Login success" };
  }

  @Public()
  @Get("health")
  health() {
    return "request successful";
  }
}

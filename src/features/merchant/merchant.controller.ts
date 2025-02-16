import { Controller, Get, Post, Body } from "@nestjs/common";
import { MerchantService } from "./merchant.service";
import { CreateMerchantDto } from "./dto/create-merchant.dto";
import { Merchant } from "./schema/merchant.schema";
import { AdminRoles, Roles } from "../common";

@Controller("merchants")
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  @Roles(AdminRoles)
  async create(
    @Body() createMerchantDto: CreateMerchantDto
  ): Promise<{ data: Merchant; message: string }> {
    const data = await this.merchantService.create(createMerchantDto);
    return { data, message: "merchant created successfully" };
  }
}

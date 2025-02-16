import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from "@nestjs/common";
import { Types } from "mongoose";
import { ResetPasswordDto } from "./dto/reset-pass.dto";
import { ValidateObjectIdPipe } from "../common/validation-helper/validate-objectid.pipe";
import { UserService } from "./user.service";
import { ResetPasswordByNumberDto } from "./dto/reset-pass-by-number-dto";
import { Public } from "../common";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Patch('reset/:userId')
  // async resetPassword(
  //     @Param('userId', ValidateObjectIdPipe) userId: Types.ObjectId,
  //     @Body() resetPasswordDto: ResetPasswordDto,
  // ) {
  //     try {
  //         return await this.userService.resetPasswordByToken(userId, resetPasswordDto);
  //     } catch (error) {
  //         if (error instanceof BadRequestException) {
  //             throw new BadRequestException(error.message);
  //         }
  //         throw new BadRequestException('Invalid request');
  //     }
  // }

  @Patch("reset/:userId")
  async resetPassword(
    @Param("userId", ValidateObjectIdPipe) userId: Types.ObjectId,
    @Body() resetPasswordDto: ResetPasswordDto
  ) {
    const user = await this.userService.resetPasswordByToken(
      userId,
      resetPasswordDto
    );
    return { data: user, message: "password reset Successfully" };
  }

  @Public()
  @Patch("reset")
  async resetPasswordByNumber(
    @Body() resetPasswordByNumberDto: ResetPasswordByNumberDto
  ): Promise<{ message: string }> {
    try {
      const user = await this.userService.resetPasswordByNumber(
        resetPasswordByNumberDto
      );
      return {
        message: "Password Reset Successfully. Password sent to your phone.",
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException("Invalid request");
    }
  }

  @Public()
  @Get("")
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}

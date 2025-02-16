import { Types } from "mongoose";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { appConfig } from "../config";
import { ACTIVITY_LOG_ENUM, RolesEnum, USER_STATUS } from "../constant";
import { UtilService } from "../common/services/utils.service";
import { MerchantService } from "../merchant/merchant.service";
import { AdminRoles } from "../common";
import {
  AuthUser,
  UserLginInfo,
} from "../common/decorator/get-auth-user.decorator";
import {
  IAuthUser,
  IUserLoginInfo,
} from "../common/interfaces/auth-user.interface";
import { AdminActivityLogService } from "../activity-log/admin-activity-log.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utilService: UtilService,

    private readonly merchantService: MerchantService,

    private readonly adminActivityLogService: AdminActivityLogService
  ) {}

  async logIn(
    loginDto: LoginDto,
    @UserLginInfo() userLginInfo: IUserLoginInfo
  ) {
    //@ Find user by mobile number
    let user = await this.userService.getUserByMobile(loginDto.mobile);

    //@ Check if the user exists
    if (!user) throw new NotAcceptableException("Mobile not found");

    //@ Check if the user's account is active
    if (user.status == USER_STATUS.INACTIVE) {
      throw new ForbiddenException("You are not allowed to login");
    }

    //@ Check if the provided password matches the stored password or the master password
    const masterPassword = appConfig().master_password;
    const passwordValid = await compare(loginDto.password, user.password);

    if (!passwordValid && loginDto.password !== masterPassword) {
      throw new NotAcceptableException("Invalid Password");
    }

    //@ Handle MERCHANT role
    if (user.role === RolesEnum.MERCHANT) {
      const merchant = await this.merchantService.findByUserId(user._id);

      if (!merchant) throw new BadRequestException("Merchant not found");
      user = this.utilService.mergeUserAndAuthUser(user, merchant);
    }

    //@ Prepare the payload for the JWT token
    const payload: any = {
      _id: user._id,
    };

    //@ Generate the JWT access token
    const accessToken = this.jwtService.sign(payload);

    //@ Return the response based on the user's role

    return { accessToken, user };
  }
}

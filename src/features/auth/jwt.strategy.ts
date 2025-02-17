import { appConfig } from "../config";
import { RolesEnum } from "../constant";
import { IAuthUser } from "../common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { Types } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    const config = appConfig();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt_secret,
    });
  }

  async validate(payload: IAuthUser, req: Request) {
    //@ Retrieve user by ID from the database
    const user = await this.userService.getUserById(
      new Types.ObjectId(payload._id)
    );

    if (!user) throw new UnauthorizedException();

    //@ Compare token's issued-at time (iat) with user's updated-at time
    const tokenIssuedAt = new Date(payload.iat * 1000);
    const userUpdatedAt = user.passwordUpdatedAt;

    //@ If user has been updated after token issuance, reject the request
    if (userUpdatedAt > tokenIssuedAt) {
      throw new UnauthorizedException();
    }

    //@ Serialize the user data to avoid circular references with MongoDB objects
    const jsonUser = JSON.parse(JSON.stringify(user));

    //@ Remove sensitive data like the password before proceeding
    delete jsonUser.password;

    return jsonUser;
  }
}

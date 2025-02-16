import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSION_KEY } from "../common/decorator/permission.decorator";
import { RolesEnum } from "../constant";
import { isPublicKey } from "../common";
import { ROLES_KEY } from "../common/decorator/role-check.decorator";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.getAllAndOverride<{
      key: string;
      nestedKey: string;
    }>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    //check the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(isPublicKey, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const roles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user } = context.switchToHttp().getRequest();
    //check role
    if (Array.isArray(roles) && roles.length && !roles.includes(user.role)) {
      return false;
    }

    if (user.role === RolesEnum.ADMIN || user.role === RolesEnum.MERCHANT) {
      return true;
    }
    return true;
  }
}

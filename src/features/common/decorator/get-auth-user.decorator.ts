import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { IAuthUser, IUserLoginInfo } from '../interfaces/auth-user.interface';

export enum QueryEnum {
    MERCHANT = 'merchant',
    RESELLER = 'reseller',
    SUB_RESELLER = 'subReseller',
    USER_ID = 'userId',
}

export const AuthUser = createParamDecorator((_data, ctx: ExecutionContext): IAuthUser => {
    const req = ctx.switchToHttp().getRequest();
    const origin = req.get('origin');
    // if (origin && req.user.originURL && origin !== req.user.originURL && !origin.includes('localhost')) {
    //     throw new ForbiddenException('Forbidden resource');
    // }
    req.user.ipAddress = req.ip;
    req.user.userAgent = req.get('user-agent') || '';
    req.user.device = req.get('device') || '';
    return req.user;
});

export const UserLginInfo = createParamDecorator((_data: unknown, ctx: ExecutionContext): IUserLoginInfo => {
    const req = ctx.switchToHttp().getRequest();
    const ipAddress = req.ip;
    const userAgent = req.get('user-agent') || '';
    const device = req.get('device') || '';
    const origin = req.get('origin');

    return { ipAddress, userAgent, device, origin };
});

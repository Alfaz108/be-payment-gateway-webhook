import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/features/constant';

export const ROLES_KEY = 'role';
export const Roles = (roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);

//Common Role array
export const CommonRoles = [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.MERCHANT, RolesEnum.EMPLOYEE];

//admin role array
export const AdminRoles = [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN];

//Distributo role array
// export const DistributorRoles = [RolesEnum.DISTRIBUTOR];

//all roles array
export const AllRoles = [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.MERCHANT,
    RolesEnum.EMPLOYEE,
    RolesEnum.RESELLER,
    RolesEnum.SUB_RESELLER,
    RolesEnum.DISTRIBUTOR,
    RolesEnum.DISTRIBUTOR_AGENT,
];

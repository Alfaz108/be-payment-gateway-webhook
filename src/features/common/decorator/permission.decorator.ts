import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';
export const Permission = (key: string, nestedKey: string) => {
    return SetMetadata(PERMISSION_KEY, { key, nestedKey });
};

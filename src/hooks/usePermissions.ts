import { rolePermissions } from '@config/rolePermissions.config';
import { Role } from '@types';

import { useAppSelector } from './storeHooks';

export const usePermissions = () => {
    const { user } = useAppSelector((state) => state?.auth);
    const role = user?.role ?? Role.CUSTOMER;
    const userPermissions = rolePermissions[role];

    const hasPermission = (permission: string) =>
        userPermissions.includes(permission);

    return { hasPermission };
};

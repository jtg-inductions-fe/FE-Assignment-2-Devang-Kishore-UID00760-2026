import { rolePermissions } from '@config/rolePermissions.config';

import { UseAppSelector } from './storeHooks';

export const usePermissions = () => {
    const { user } = UseAppSelector((state) => state?.auth);
    const role = user?.role ?? 'customer';
    const userPermissions = rolePermissions[role];

    return (permission: string) => userPermissions.includes(permission);
};

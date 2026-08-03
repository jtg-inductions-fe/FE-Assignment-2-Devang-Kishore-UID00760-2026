import { Navigate, Outlet } from 'react-router-dom';

import { UseAppSelector } from '@hooks/storeHooks';

export const ProtectedRoutes = ({
    allowedRoles,
}: {
    allowedRoles: string[];
}) => {
    const { user } = UseAppSelector((state) => state.auth);
    return allowedRoles.includes(user?.role ?? 'customer') ? (
        <Outlet />
    ) : (
        <Navigate to="/discovery" replace />
    );
};

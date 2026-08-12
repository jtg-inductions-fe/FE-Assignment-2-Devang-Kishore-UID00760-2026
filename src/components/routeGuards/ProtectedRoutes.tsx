import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@hooks/authHooks';

export const ProtectedRoutes = ({
    allowedRoles,
}: {
    allowedRoles: string[];
}) => {
    const user = useAuth();

    return allowedRoles.includes(user?.role ?? 'customer') ? (
        <Outlet />
    ) : (
        <Navigate to="/discovery" replace />
    );
};

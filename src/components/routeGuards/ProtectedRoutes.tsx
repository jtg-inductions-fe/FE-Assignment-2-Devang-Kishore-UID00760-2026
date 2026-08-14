import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constants';
import { USERS } from '@constants';
import { useAuth } from '@hooks/useAuth';

export const ProtectedRoutes = ({
    allowedRoles,
}: {
    allowedRoles: string[];
}) => {
    const { user } = useAuth();

    return allowedRoles.includes(user?.role ?? USERS.customer) ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.DISCOVERY} replace />
    );
};

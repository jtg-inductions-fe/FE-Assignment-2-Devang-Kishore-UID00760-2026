import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constants';
import { useAuth } from '@hooks/useAuth';

export const AuthRoute = () => {
    const { isLoggedIn } = useAuth();

    return !isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.DISCOVERY} replace />
    );
};

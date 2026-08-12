import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constants';
import { useAuth } from '@hooks/authHooks';

export const AuthRoute = () => {
    const user = useAuth();

    return !user ? <Outlet /> : <Navigate to={ROUTES.DISCOVERY} replace />;
};

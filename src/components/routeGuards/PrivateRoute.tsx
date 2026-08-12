import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@hooks/storeHooks';

import { ROUTES } from '../../constants';

export const PrivateRoute = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

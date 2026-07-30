import { Navigate, Outlet } from 'react-router-dom';

import { UseAppSelector } from '@hooks/storeHooks';
export const AuthRoute = () => {
    const { isLoggedIn } = UseAppSelector((state) => state.auth);
    return !isLoggedIn ? <Outlet /> : <Navigate to="/discovery" replace />;
};

import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoute = () => {
    const user = true; //will check using redux store

    return !user ? <Outlet /> : <Navigate to="/discovery" replace />;
};

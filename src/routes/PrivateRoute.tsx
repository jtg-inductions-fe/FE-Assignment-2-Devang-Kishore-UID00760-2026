import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const user = true; //will check using redux store
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

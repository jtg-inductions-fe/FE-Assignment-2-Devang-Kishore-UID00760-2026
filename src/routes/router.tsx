import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthRoute } from '@components/routeGuards/AuthRoute';
import { PrivateRoute } from '@components/routeGuards/PrivateRoute';
import { ROUTES } from '@constants';
import { AppLayout } from '@layouts/AppLayout';
import { LoginPage } from '@pages/auth/LoginPage';
import { SignupPage } from '@pages/auth/SignupPage';
import { ErrorPage } from '@pages/fallback/ErrorPage';
import { NotFoundPage } from '@pages/fallback/NotFoundPage';

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <PrivateRoute />,
                children: [
                    {
                        children: [
                            {
                                index: true,
                                element: (
                                    <Navigate to={ROUTES.DISCOVERY} replace />
                                ),
                            },
                            {
                                path: ROUTES.DISCOVERY,
                                element: <div>discovery</div>,
                            },
                            {
                                path: ROUTES.RESTAURANT,
                                element: <div>restaurant</div>,
                            },
                            {
                                path: ROUTES.CART,
                                element: <div>cart</div>,
                            },
                            {
                                path: ROUTES.ORDERS,
                                element: <div>orders</div>,
                            },
                            {
                                path: ROUTES.CHECKOUT,
                                element: <div>checkout</div>,
                            },
                        ],
                    },
                ],
            },
            {
                element: <AuthRoute />,

                children: [
                    {
                        children: [
                            {
                                path: ROUTES.LOGIN,
                                element: <LoginPage />,
                            },
                            {
                                path: ROUTES.SIGNUP,
                                element: <SignupPage />,
                            },
                        ],
                    },
                ],
            },
            { path: ROUTES.ALL, element: <NotFoundPage /> },
        ],
    },
]);

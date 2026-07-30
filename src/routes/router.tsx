import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@constant';
import { Login } from '@container/Auth/Login';
import { Signup } from '@container/Auth/Signup';
import { ErrorPage } from '@container/exceptions/ErrorPage';
import { NotFoundPage } from '@container/exceptions/NotFoundPage';
import { AppLayout } from '@layouts/AppLayout';
import { AuthLayout } from '@layouts/AuthLayout';

import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <PrivateRoute />,
                children: [
                    {
                        element: <AppLayout />,
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
                        element: <AuthLayout />,
                        children: [
                            {
                                path: ROUTES.LOGIN,
                                element: <Login />,
                            },
                            {
                                path: ROUTES.SIGNUP,
                                element: <Signup />,
                            },
                        ],
                    },
                ],
            },

            { path: ROUTES.ALL, element: <NotFoundPage /> },
        ],
    },
]);

import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@constant';

import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ErrorPage } from '../pages/ErrorPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        children: [
            {
                element: <PrivateRoute />,
                errorElement: <ErrorPage />,
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
                                element: <div>login</div>,
                            },
                            {
                                path: ROUTES.SIGNUP,
                                element: <div>signup</div>,
                            },
                        ],
                    },
                ],
            },

            { path: ROUTES.ALL, element: <NotFoundPage /> },
        ],
    },
]);

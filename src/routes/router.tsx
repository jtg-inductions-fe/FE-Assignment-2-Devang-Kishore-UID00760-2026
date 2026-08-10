import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ErrorPage } from '@containers/errors/Error.container';
import { NotFoundPage } from '@containers/errors/NotFound.container';
import { AppLayout } from '@layouts/AppLayout';

import { AuthRoute } from '../components/routeGaurds/AuthRoute';
import { PrivateRoute } from '../components/routeGaurds/PrivateRoute';
import { ROUTES } from '../constants';

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

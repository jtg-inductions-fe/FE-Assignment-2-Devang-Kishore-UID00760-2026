import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AddRestaurant } from '@containers/addRestaurant/AddRestaurant';
import { Login } from '@containers/auth/Login';
import { Signup } from '@containers/auth/Signup';
import { Discovery } from '@containers/discovery/Discovery';
import { ErrorPage } from '@containers/exceptions/ErrorPage';
import { NotFoundPage } from '@containers/exceptions/NotFoundPage';
import { AppLayout } from '@layouts/AppLayout';
import { AuthLayout } from '@layouts/AuthLayout';

import { AuthRoute } from './AuthRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { ROUTES } from '../constants';
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
                                element: <Discovery />,
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
                            {
                                element: (
                                    <ProtectedRoutes allowedRoles={['owner']} />
                                ),
                                children: [
                                    {
                                        path: ROUTES.ADD_RESTAURANT,
                                        element: <AddRestaurant />,
                                    },
                                    {
                                        path: ROUTES.EDIT_RESTAURANT,
                                        element: <AddRestaurant />,
                                    },
                                ],
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

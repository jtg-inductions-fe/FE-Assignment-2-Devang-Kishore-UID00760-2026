import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthRoute } from '@components/routeGuards/AuthRoute';
import { PrivateRoute } from '@components/routeGuards/PrivateRoute';
import { ProtectedRoutes } from '@components/routeGuards/ProtectedRoutes';
import { ROUTES } from '@constants';
import { AddEditRestaurant } from '@containers/addEditRestaurant/AddEditRestaurant';
import { AppLayout } from '@layouts/AppLayout';
import { LoginPage } from '@pages/auth/LoginPage';
import { SignupPage } from '@pages/auth/SignupPage';
import { DiscoveryPage } from '@pages/discovery/Discovery';
import { ErrorPage } from '@pages/fallback/ErrorPage';
import { NotFoundPage } from '@pages/fallback/NotFoundPage';
import { RestaurantMenuPage } from '@pages/restaurantMenu/RestaurantMenu';

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
                                element: <DiscoveryPage />,
                            },
                            {
                                path: ROUTES.RESTAURANT,
                                element: <RestaurantMenuPage />,
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
                                        element: <AddEditRestaurant />,
                                    },
                                    {
                                        path: ROUTES.EDIT_RESTAURANT,
                                        element: <AddEditRestaurant />,
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

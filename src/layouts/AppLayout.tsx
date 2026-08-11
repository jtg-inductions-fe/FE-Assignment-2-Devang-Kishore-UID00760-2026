import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { ShoppingCartOutlined } from '@mui/icons-material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Box } from '@mui/material';

import { ConfirmDialog } from '@components/confirmationDialog/ConfirmationDialog';
import { Header } from '@components/header/Header';
import { permissions } from '@config/permissions.config';
import { CartContainer } from '@containers/cart/Cart';
import { usePermissions } from '@hooks/permissionsHook';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { logout } from '@store/slices/authSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';
import { fetchMenu } from '@store/slices/menuSlice';
import { fetchOrders } from '@store/slices/ordersSlice';
import { fetchRestaurants } from '@store/slices/restaurantSlice';
import { ConfirmationDialogProps, FoodType } from '@types';

import { ROUTES } from '../constants';

export const AppLayout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foodPreference, setFoodPreference] = useState<FoodType>('both');
    const { user } = UseAppSelector((state) => state.auth);
    const dispatch = UseAppDispatch();
    const hasPermission = usePermissions();
    const location = useLocation();
    const navigate = useNavigate();
    const orders = UseAppSelector((state) => state.orders.items);

    const currentLocation = location.pathname;
    const currentRoute = currentLocation.split('/')[1];
    const [dialogData, setDialogData] = useState<
        Omit<ConfirmationDialogProps, 'onCancel' | 'confirmLabel'>
    >({
        open: false,
        title: '',
        message: '',
        onConfirm: () => {},
    });

    const [cartOpen, setCartOpen] = useState(false);
    const [searchParams, setSearchparams] = useSearchParams();
    const cartItems = UseAppSelector((state) => state.cart.items);
    const cartItemsCount = cartItems.length;
    const ordersCount = orders.length;
    const handleCancel = () => {
        setDialogData((state) => ({
            open: !state.open,
            title: state.title,
            message: state.message,
            onConfirm: state.onConfirm,
        }));
    };

    const handleLogout = () => {
        setDialogData(() => ({
            open: true,
            title: 'Logout',
            message: 'Do you want to logout?',
            onConfirm: () => void dispatch(logout()),
        }));
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        const params = new URLSearchParams(searchParams);
        params.delete('search');
        setSearchparams(params);
    };

    const handleFoodType = (value: FoodType) => {
        setFoodPreference(value);
        const search = searchParams.get('search');
        setSearchparams({
            ...(value !== 'both' && { type: value }),
            ...(search && { search }),
        });
    };

    const handleCartClose = () => {
        setCartOpen(false);
    };

    const handleCartOpen = () => {
        setCartOpen(true);
    };

    const handleNavigateOrder = () => {
        void navigate(ROUTES.ORDERS);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key != 'Enter') {
            return;
        }
        const query = searchQuery.trim();
        if (!query) {
            searchParams.delete('search');
            setSearchparams(searchParams);
            return;
        }
        const type = searchParams.get('type');
        setSearchparams({
            search: query,
            ...(type && { type }),
        });
    };

    useEffect(() => {
        if (!user?.id || !user.role) {
            return;
        }
        void dispatch(fetchOrders({ userId: user.id, role: user.role }));
    }, [dispatch, user]);

    useEffect(() => {
        const handleRestaurantFetch = () => {
            dispatch(
                fetchRestaurants({
                    search:
                        searchQuery || searchParams.get('search') || undefined,
                    type: foodPreference || searchParams.get('type'),
                    ownerId: user?.role === 'owner' ? user?.id : '',
                }),
            )
                .unwrap()
                .catch(() => {
                    dispatch(
                        showSnackbar({
                            message: 'Error while fetching restaurants.',
                            severity: 'error',
                        }),
                    );
                });
        };

        const handleMenuFetch = () => {
            const restaurantId = currentLocation.split('/')[2];
            dispatch(
                fetchMenu({
                    restaurantId: restaurantId,
                    filters: {
                        search:
                            searchQuery ||
                            searchParams.get('search') ||
                            undefined,
                        type: foodPreference || searchParams.get('type'),
                    },
                }),
            )
                .unwrap()
                .catch(() => {
                    dispatch(
                        showSnackbar({
                            message: 'Error while fetching menu items.',
                            severity: 'error',
                        }),
                    );
                });
        };

        const timer = setTimeout(
            () =>
                currentRoute === 'discovery'
                    ? handleRestaurantFetch()
                    : handleMenuFetch(),
            500,
        );
        return () => clearTimeout(timer);
    }, [
        dispatch,
        searchQuery,
        foodPreference,
        currentRoute,
        currentLocation,
        user,
        searchParams,
    ]);

    return (
        <main>
            <Header
                searchBarProps={{
                    value: searchQuery,
                    placeholder: `${currentLocation === '/discovery' ? 'Search Restaurants....' : 'Search menu items...'}`,
                    fullWidth: true,
                    onKeyDown: handleKeyDown,
                    onChange: handleSearch,
                }}
                vegToggleProps={{
                    value: foodPreference,
                    onChange: handleFoodType,
                }}
                cartButtonProps={{
                    icon: <ShoppingCartOutlined />,
                    badgeContent: cartItemsCount,
                    onClick: handleCartOpen,
                }}
                ordersButtonProps={{
                    icon: <ShoppingBagIcon />,
                    badgeContent: ordersCount,
                    onClick: handleNavigateOrder,
                }}
                profileMenuProps={{
                    name: user?.name ?? 'User',
                    onLogout: () => {
                        handleLogout();
                    },
                }}
                showCart={hasPermission(permissions.SHOW_CART)}
            />
            <Box maxWidth={2000} margin="auto">
                <Outlet />
            </Box>
            <ConfirmDialog
                open={dialogData.open}
                title={dialogData.title}
                message={dialogData.message}
                confirmLabel={'Confirm'}
                onCancel={() => {
                    handleCancel();
                }}
                onConfirm={dialogData.onConfirm}
            />
            <CartContainer open={cartOpen} onClose={handleCartClose} />
        </main>
    );
};

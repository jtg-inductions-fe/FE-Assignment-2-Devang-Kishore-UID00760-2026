import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { Outlet, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { ShoppingCartOutlined } from '@mui/icons-material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Box } from '@mui/material';

import { ConfirmDialog } from '@components/confirmationDialog';
import { Header } from '@components/header/Header';
import { permissions } from '@config/permissions.config';
import { ROUTES } from '@constants';
import { CartContainer } from '@containers/cart/Cart';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { usePermissions } from '@hooks/usePermissions';
import { logout } from '@store/slices/auth/authSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { fetchMenu } from '@store/slices/menu/menuSlice';
import { fetchRestaurants } from '@store/slices/restaurant/restaurantSlice';
import { ConfirmationDialogProps, FoodType, Role, SnackbarTheme } from '@types';

import { appLayoutContent } from './appLayout.constants';

export const AppLayout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foodPreference, setFoodPreference] = useState<FoodType>(
        FoodType.BOTH,
    );
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const hasPermission = usePermissions();
    const location = useLocation();

    const currentLocation = location.pathname;
    const SHOW_HEADER =
        currentLocation !== ROUTES.LOGIN && currentLocation !== ROUTES.SIGNUP;
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
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartItemsCount = cartItems.length;

    const handleCancel = () => {
        setDialogData((state) => ({
            open: !state.open,
            title: state.title,
            message: state.message,
            onConfirm: state.onConfirm,
        }));
    };

    const handleLogout = () => {
        const onConfirm = () => {
            dispatch(logout());
            setDialogData(() => ({
                open: false,
                title: '',
                message: '',
                onConfirm: () => {},
            }));
        };
        setDialogData(() => ({
            open: true,
            title: appLayoutContent.LOGOUT_TITLE,
            message: appLayoutContent.LOGOUT_MESSAGE,
            onConfirm: onConfirm,
        }));
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    const handleFoodType = (value: FoodType) => {
        setFoodPreference(value);
    };

    const handleCartClose = () => {
        setCartOpen(false);
    };

    const handleCartOpen = () => {
        setCartOpen(true);
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
        setSearchparams({
            search: query,
        });
    };

    useEffect(() => {
        const handleRestaurantFetch = () => {
            dispatch(
                fetchRestaurants({
                    search: searchQuery,
                    type: foodPreference,
                    ownerId: user?.role === Role.OWNER ? user?.id : '',
                }),
            )
                .unwrap()
                .catch(() => {
                    dispatch(
                        showSnackbar({
                            message: appLayoutContent.FETCH_RESTAURANT_ERROR,
                            severity: SnackbarTheme.ERROR,
                        }),
                    );
                });
        };

        const handleMenuFetch = () => {
            const restaurantId = currentLocation.split('/')[2];
            dispatch(
                fetchMenu({
                    restaurantId: restaurantId,
                    filters: { search: searchQuery, type: foodPreference },
                }),
            )
                .unwrap()
                .catch(() => {
                    dispatch(
                        showSnackbar({
                            message: appLayoutContent.FETCH_MENU_ERROR,
                            severity: SnackbarTheme.ERROR,
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
    ]);

    return (
        <main>
            {SHOW_HEADER && (
                <Header
                    searchBarProps={{
                        value: searchQuery,
                        placeholder: `${currentLocation === `${ROUTES.DISCOVERY}` ? appLayoutContent.RESTAURANT_SEARCH_PLACEHOLDER : appLayoutContent.MENU_SEARCH_PLACEHOLDER}`,
                        fullWidth: true,
                        onChange: handleSearch,
                        onKeyDown: handleKeyDown,
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
                        badgeContent: 3,
                    }}
                    profileMenuProps={{
                        name: user?.name ?? appLayoutContent.USER,
                        onLogout: () => {
                            handleLogout();
                        },
                    }}
                    showCart={hasPermission(permissions.SHOW_CART)}
                />
            )}
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

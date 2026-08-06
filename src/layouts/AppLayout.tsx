import { ChangeEvent, useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { ShoppingCartOutlined } from '@mui/icons-material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Box } from '@mui/material';

import { ConfirmDialog } from '@components/confirmationDialog/ConfirmationDialog';
import { Header } from '@components/header/Header';
import { permissions } from '@config/permissions.config';
import { usePermissions } from '@hooks/permissionsHook';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { logout } from '@store/slices/authSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';
import { fetchMenu } from '@store/slices/menuSlice';
import { fetchRestaurants } from '@store/slices/restaurantSlice';
import { ConfirmationDialogProps, FoodType } from '@types';

export const AppLayout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foodPreference, setFoodPreference] = useState<FoodType>('both');
    const { user } = UseAppSelector((state) => state.auth);
    const dispatch = UseAppDispatch();
    const hasPermission = usePermissions();
    const location = useLocation();

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
    };

    const handleFoodType = (value: FoodType) => {
        setFoodPreference(value);
    };

    useEffect(() => {
        const handleRestaurantFetch = () => {
            dispatch(
                fetchRestaurants({
                    search: searchQuery,
                    type: foodPreference,
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
                    filters: { search: searchQuery, type: foodPreference },
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
    ]);

    return (
        <main>
            <Header
                searchBarProps={{
                    value: searchQuery,
                    placeholder: `${currentLocation === '/discovery' ? 'Search Restaurants....' : 'Search menu items...'}`,
                    fullWidth: true,
                    onChange: handleSearch,
                }}
                vegToggleProps={{
                    value: foodPreference,
                    onChange: handleFoodType,
                }}
                cartButtonProps={{
                    icon: <ShoppingCartOutlined />,
                    badgeContent: 3,
                }}
                ordersButtonProps={{
                    icon: <ShoppingBagIcon />,
                    badgeContent: 3,
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
        </main>
    );
};

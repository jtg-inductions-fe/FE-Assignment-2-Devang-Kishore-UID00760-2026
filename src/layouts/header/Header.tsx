import { ChangeEvent, useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { ShoppingCartOutlined } from '@mui/icons-material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Divider } from '@mui/material';

import { BadgeIconButton } from '@components/badgeIconButton';
import { ConfirmDialog } from '@components/confirmationDialog';
import { Logo } from '@components/logo';
import { ProfileMenu } from '@components/profileMenu';
import { Searchbar } from '@components/searchBar';
import { permissions } from '@config/permissions.config';
import { ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { usePermissions } from '@hooks/usePermissions';
import { logout } from '@store/slices/auth/authSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { fetchMenu } from '@store/slices/menu/menuSlice';
import { fetchRestaurants } from '@store/slices/restaurant/restaurantSlice';
import { ConfirmationDialogProps, FoodType, Role, SnackbarTheme } from '@types';

import { headerTextContent } from './header.constants';
import {
    FoodTypeSwitch,
    HeaderActions,
    HeaderBox,
    HeaderFilters,
    LogoContainer,
    SwitchButton,
    SwitchButtonGroup,
} from './Header.styles';

export const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foodPreference, setFoodPreference] = useState<FoodType>(
        FoodType.BOTH,
    );
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { hasPermission } = usePermissions();
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

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    const handleFoodType = (value: FoodType) => {
        setFoodPreference(value);
    };

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
            title: headerTextContent.LOGOUT_TITLE,
            message: headerTextContent.LOGOUT_MESSAGE,
            onConfirm: () => void dispatch(logout()),
        }));
    };

    const searchBarProps = {
        value: searchQuery,
        placeholder: `${currentLocation === `${ROUTES.DISCOVERY}` ? headerTextContent.RESTAURANT_SEARCH_PLACEHOLDER : headerTextContent.MENU_SEARCH_PLACEHOLDER}`,
        fullWidth: true,
        onChange: handleSearch,
    };

    const cartButtonProps = {
        icon: <ShoppingCartOutlined />,
        badgeContent: 3,
    };

    const ordersButtonProps = {
        icon: <ShoppingBagIcon />,
        badgeContent: 3,
    };

    const profileMenuProps = {
        name: user?.name ?? headerTextContent.USER,
        onLogout: handleLogout,
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
                            message: headerTextContent.FETCH_RESTAURANT_ERROR,
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
                            message: headerTextContent.FETCH_MENU_ERROR,
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

    const showCart = hasPermission(permissions.SHOW_CART);
    return (
        <>
            <HeaderBox>
                <LogoContainer>
                    <Link to={ROUTES.ROOT}>
                        <Logo />
                    </Link>
                </LogoContainer>
                <HeaderFilters>
                    <Searchbar {...searchBarProps} />
                    <FoodTypeSwitch>
                        <SwitchButtonGroup
                            exclusive
                            value={foodPreference}
                            onChange={(_, newValue: FoodType) => {
                                if (newValue) {
                                    handleFoodType(newValue);
                                }
                            }}
                        >
                            <SwitchButton value="Both" color="primary">
                                {FoodType.BOTH}
                            </SwitchButton>
                            <SwitchButton value="Veg" color="secondary">
                                {FoodType.VEG}
                            </SwitchButton>
                            <SwitchButton value="Non Veg" color="error">
                                {FoodType.NON_VEG}
                            </SwitchButton>
                        </SwitchButtonGroup>
                    </FoodTypeSwitch>
                </HeaderFilters>

                <HeaderActions>
                    {ordersButtonProps && (
                        <BadgeIconButton {...ordersButtonProps} />
                    )}
                    {showCart && cartButtonProps && (
                        <BadgeIconButton {...cartButtonProps} />
                    )}
                    <ProfileMenu {...profileMenuProps} />
                </HeaderActions>
            </HeaderBox>
            <Divider />
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
        </>
    );
};

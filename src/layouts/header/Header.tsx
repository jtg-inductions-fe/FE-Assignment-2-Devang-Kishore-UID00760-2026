import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

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
import { PAGE_SIZE } from '@constants';
import { CartContainer } from '@containers/cart/Cart';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { usePermissions } from '@hooks/usePermissions';
import { logoutCurrentUser } from '@store/slices/auth/authSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { fetchMenu } from '@store/slices/menu/menuSlice';
import { fetchOrders } from '@store/slices/order/ordersSlice';
import { fetchRestaurants } from '@store/slices/restaurant/restaurantSlice';
import { ConfirmationDialogProps, FoodType, SnackbarTheme } from '@types';

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
    const [cartOpen, setCartOpen] = useState(false);
    const [foodPreference, setFoodPreference] = useState<FoodType>(
        FoodType.VEG,
    );
    const [dialogData, setDialogData] = useState<
        Omit<ConfirmationDialogProps, 'onCancel' | 'confirmLabel'>
    >({
        open: false,
        title: '',
        message: '',
        onConfirm: () => {},
    });
    const [searchParams, setSearchparams] = useSearchParams();
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { hasPermission } = usePermissions();
    const location = useLocation();
    const cartItems = useAppSelector((state) => state.cart.items);
    const orders = useAppSelector((state) => state.orders.items);
    const showCart = hasPermission(permissions.SHOW_CART);
    const navigate = useNavigate();
    const cartItemsCount = cartItems.length;
    const ordersCount = orders.length;
    const currentLocation = location.pathname;
    const currentRoute = currentLocation.split('/')[1];
    const {loading,hasMore,nextCursor}=useAppSelector((state)=>state.restaurants)
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    const handleFoodType = (value: FoodType) => {
        setFoodPreference(value);
        const search = searchParams.get('search');
        setSearchparams({
            ...(value !== FoodType.VEG && { type: value }),
            ...(search && { search }),
        });
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
            onConfirm: () => void dispatch(logoutCurrentUser()),
        }));
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

    const searchBarProps = {
        value: searchQuery,
        placeholder:
            currentLocation === ROUTES.DISCOVERY
                ? headerTextContent.RESTAURANT_SEARCH_PLACEHOLDER
                : headerTextContent.MENU_SEARCH_PLACEHOLDER,
        fullWidth: true,
        onChange: handleSearch,
        onKeyDown: handleKeyDown,
    };

    const cartButtonProps = {
        icon: <ShoppingCartOutlined />,
        badgeContent: cartItemsCount,
        onClick: handleCartOpen,
    };

    const ordersButtonProps = {
        icon: <ShoppingBagIcon />,
        badgeContent: ordersCount,
        onClick: handleNavigateOrder,
    };

    const profileMenuProps = {
        name: user?.full_name ?? headerTextContent.USER,
        onLogout: handleLogout,
        onProfileClick: () => navigate(ROUTES.PROFILE),
    };

    useEffect(() => {
        const handleRestaurantFetch = () => {
            dispatch(
                fetchRestaurants({
                    search: searchQuery,
                    food_type: foodPreference,
                    page_size:PAGE_SIZE,
                    append:false
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
                    filters: { search: searchQuery, food_type: foodPreference, page_size:PAGE_SIZE,append:false},
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
        if(searchQuery||foodPreference!=FoodType.VEG){
            const timer = setTimeout(() => {
                if (currentRoute === 'discovery') {
                    handleRestaurantFetch();
                }
                if (currentRoute === 'restaurant') {
                    handleMenuFetch();
                }
            }, 500);

            return () => clearTimeout(timer);
        }else{
            if (currentRoute === 'discovery') {
                    handleRestaurantFetch();
                }
            if (currentRoute === 'restaurant') {
                    handleMenuFetch();
             }
        }
    }, [
        dispatch,
        searchQuery,
        foodPreference,
        currentRoute,
        currentLocation,
        user,
    ]);

    useEffect(()=>{
        if(currentRoute!="discovery")
            return

        const handleScroll=()=>{
            if(loading||!hasMore||!nextCursor){
                return;
            }
            const nearBottom=window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-500;
            if(!nearBottom) 
                return;
            dispatch(
                fetchRestaurants({
                    search: searchQuery,
                    food_type: foodPreference,
                    cursor:nextCursor,
                    page_size:PAGE_SIZE,
                    append:true
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
        }
        window.addEventListener("scroll",handleScroll);

        return ()=>{
            window.removeEventListener("scroll",handleScroll);
        }
    },[currentRoute,searchQuery,foodPreference,loading,hasMore,nextCursor,dispatch])

    useEffect(() => {
        if (!user?.id || !user.role) {
            return;
        }

        void dispatch(fetchOrders({ userId: user.id, role: user.role }));
    }, [dispatch, user]);

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
                            <SwitchButton
                                value={FoodType.VEG}
                                color="secondary"
                            >
                                {headerTextContent.VEG}
                            </SwitchButton>
                            <SwitchButton
                                value={FoodType.NON_VEG}
                                color="error"
                            >
                                {headerTextContent.NON_VEG}
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
            <CartContainer open={cartOpen} onClose={handleCartClose} />
        </>
    );
};

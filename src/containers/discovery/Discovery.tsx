import { ChangeEvent, useEffect, useState } from 'react';

import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';

import { ShoppingCartOutlined } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ConfirmDialog } from '@components/confirmationDialog/ConfirmationDialog';
import { Header } from '@components/header/Header';
import { RestaurantCard } from '@components/restaurantCard';
import { permissions } from '@config/permissions.config';
import { usePermissions } from '@hooks/permissionsHook';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { logout } from '@store/slices/authSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';
import {
    fetchRestaurants,
    removeRestaurant,
    updateRestaurantData,
} from '@store/slices/restaurantSlice';
import { ConfirmationDialogProps, Day, FoodType, Restaurant } from '@types';

import {
    CuisineChip,
    CuisinesSection,
    DiscoveryContainer,
    RestaurantNotFound,
} from './Discovery.styled';
import { ROUTES } from '../../constants';

const CUISINES = [
    'Indian',
    'Chinese',
    'Italian',
    'Mexican',
    'Thai',
    'Japanese',
    'American',
    'FastFood',
    'Desserts',
    'Beverages',
];

export const Discovery = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') ?? '';
    const foodType = (searchParams.get('type') as FoodType) ?? 'both';
    const { user } = UseAppSelector((state) => state.auth);
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();
    const hasPermission = usePermissions();
    const { items: restaurants, loading } = UseAppSelector(
        (state) => state.restaurants,
    );
    useEffect(() => {
        dispatch(fetchRestaurants({ search, type: foodType }))
            .unwrap()
            .catch(() => {
                dispatch(
                    showSnackbar({
                        message: 'Error while fetching restaurants.',
                        severity: 'error',
                    }),
                );
            });
    }, [dispatch, search, foodType]);
    const handleEdit = (id: string) => {
        void navigate(generatePath(ROUTES.EDIT_RESTAURANT, { id: id }));
    };

    const formStateTime = (time: string) => {
        const [hoursStr, minutes] = time.split(':');
        let hours = parseInt(hoursStr, 10);
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${amPm}`;
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const params = new URLSearchParams(searchParams);
        if (value.trim()) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        setSearchParams(params);
    };
    const handleFoodType = (value: FoodType) => {
        const params = new URLSearchParams(searchParams);
        if (value === 'both') {
            params.delete('type');
        } else {
            params.set('type', value);
        }
        setSearchParams(params);
    };
    const handleToggleRestaurant = (restaurant: Restaurant) => {
        dispatch(
            updateRestaurantData({
                id: restaurant.id,
                data: { isOpen: !restaurant.isOpen },
            }),
        )
            .unwrap()
            .catch(() => {
                dispatch(
                    showSnackbar({
                        message: 'error while updating restaurant',
                        severity: 'error',
                    }),
                );
            });
    };

    const showCuisines = hasPermission(permissions.SHOW_CUISINES_GRID);
    const showAddRestaurant = hasPermission(permissions.ADD_RESTAURANT);
    const [dailogData, setDailogData] = useState<
        Omit<ConfirmationDialogProps, 'onCancel' | 'confirmLabel'>
    >({
        open: false,
        title: '',
        message: '',
        onConfirm: () => {},
    });

    const handleCancel = () => {
        setDailogData((state) => ({
            open: !state.open,
            title: state.title,
            message: state.message,
            onConfirm: state.onConfirm,
        }));
    };

    const handleAddRestaurant = () => {
        void navigate(ROUTES.ADD_RESTAURANT);
    };

    const handleLogout = () => {
        setDailogData(() => ({
            open: true,
            title: 'Logout',
            message: 'Do you want to logout?',
            onConfirm: () => void dispatch(logout()),
        }));
    };
    const handleDelete = (id: string) => {
        const confirmDelete = () => {
            setDailogData((state) => ({ ...state, open: !state.open }));
            return void dispatch(removeRestaurant(id));
        };
        setDailogData(() => ({
            open: true,
            title: `Delete Restaurant`,
            message: 'Do you want to delete restaurant?',
            onConfirm: () => {
                confirmDelete();
            },
        }));
    };
    const checkRestaurantOpen = (restaurant: Restaurant) => {
        const today = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
        });
        const RestaurantOpen =
            restaurant.workingDays.includes(today as Day) && restaurant.isOpen;
        if (RestaurantOpen !== restaurant.isOpen) {
            handleToggleRestaurant(restaurant);
        }
    };

    const handleToggleConfirmation = (restaurant: Restaurant) => {
        const confirmToggle = () => {
            setDailogData((state) => ({ ...state, open: !state.open }));
            handleToggleRestaurant(restaurant);
        };
        setDailogData(() => ({
            open: true,
            title: `${restaurant.isOpen ? 'Close' : 'Open'} Restaurant`,
            message: `Do you want to ${restaurant.isOpen ? 'Close' : 'Open'} Restaurant?`,
            onConfirm: () => {
                confirmToggle();
            },
        }));
    };
    return (
        <>
            <Header
                searchBarProps={{
                    value: search,
                    placeholder: 'Search restaurants...',
                    fullWidth: true,
                    onChange: handleSearch,
                }}
                vegToggleProps={{ value: foodType, onChange: handleFoodType }}
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
            <DiscoveryContainer>
                {showAddRestaurant && (
                    <Grid size={4}>
                        <Button
                            variant="contained"
                            onClick={handleAddRestaurant}
                        >
                            ADD NEW RESTAURANT
                        </Button>
                    </Grid>
                )}
                {showCuisines && (
                    <CuisinesSection>
                        {CUISINES.map((cuisine) => (
                            <CuisineChip
                                src={`/src/assets/images/cuisines/${cuisine.toLowerCase()}.webp`}
                                key={cuisine}
                            >
                                {cuisine}
                            </CuisineChip>
                        ))}
                    </CuisinesSection>
                )}
                <Typography variant="h1">Discover Restaurants</Typography>
                <Grid container spacing={2}>
                    {restaurants?.length === 0 && (
                        <RestaurantNotFound>
                            <ErrorIcon fontSize="large" color="error" />
                            <Typography variant="h3">
                                No Restaurant Found
                            </Typography>
                        </RestaurantNotFound>
                    )}
                    {loading && (
                        <Box>
                            <Skeleton
                                height={190}
                                animation="wave"
                                variant="rectangular"
                            />
                            <Skeleton animation="wave" height={20} />
                            <Skeleton
                                animation="wave"
                                height={20}
                                width="80%"
                            />
                        </Box>
                    )}
                    {restaurants.map((restaurant) => {
                        checkRestaurantOpen(restaurant);
                        return (
                            <Grid
                                size={{ xs: 12, md: 6, lg: 4 }}
                                key={restaurant.id}
                            >
                                <RestaurantCard
                                    Restaurant={restaurant}
                                    onToggle={() => {
                                        handleToggleConfirmation(restaurant);
                                    }}
                                    onDelete={() => {
                                        handleDelete(restaurant.id);
                                    }}
                                    onEdit={() => {
                                        handleEdit(restaurant.id);
                                    }}
                                    canDelete={hasPermission(
                                        permissions.DELETE_RESTAURANT,
                                    )}
                                    canEdit={hasPermission(
                                        permissions.EDIT_RESTAURANT,
                                    )}
                                    canOpen={hasPermission(
                                        permissions.OPEN_RESTAURANT,
                                    )}
                                    formStateTime={formStateTime}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </DiscoveryContainer>
            <ConfirmDialog
                open={dailogData.open}
                title={dailogData.title}
                message={dailogData.message}
                confirmLabel={'Confirm'}
                onCancel={() => {
                    handleCancel();
                }}
                onConfirm={dailogData.onConfirm}
            />
        </>
    );
};

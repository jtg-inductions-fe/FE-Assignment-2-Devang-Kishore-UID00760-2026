import { useState } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import ErrorIcon from '@mui/icons-material/Error';
import { Box, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ConfirmDialog } from '@components/confirmationDialog';
import { RestaurantCard } from '@components/restaurantCard';
import { permissions } from '@config/permissions.config';
import { ROUTES } from '@constants';
import { CUISINES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { usePermissions } from '@hooks/usePermissions';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import {
    removeRestaurant,
    updateRestaurantData,
} from '@store/slices/restaurant/restaurantSlice';
import {
    ConfirmationDialogProps,
    Day,
    Restaurant,
    SnackbarTheme,
} from '@types';

import { discoveryContent } from './discover.constants';
import {
    CuisineChip,
    CuisinesSection,
    DiscoveryContainer,
    RestaurantButton,
    RestaurantNotFound,
} from './Discovery.styles';

export const DiscoveryPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const hasPermission = usePermissions();
    const { items: restaurants, loading } = useAppSelector(
        (state) => state.restaurants,
    );

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
                        message: discoveryContent.RESTAURANT_UPDATE_ERROR,
                        severity: SnackbarTheme.ERROR,
                    }),
                );
            });
    };

    const showCuisines = hasPermission(permissions.SHOW_CUISINES_GRID);
    const showAddRestaurant = hasPermission(permissions.ADD_RESTAURANT);
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

    const handleAddRestaurant = () => {
        void navigate(ROUTES.ADD_RESTAURANT);
    };

    const handleDelete = (id: string) => {
        const confirmDelete = () => {
            setDialogData((state) => ({ ...state, open: !state.open }));
            return void dispatch(removeRestaurant(id));
        };
        setDialogData(() => ({
            open: true,
            title: discoveryContent.RESTAURANT_DELETE_TITLE,
            message: discoveryContent.RESTAURANT_DELETE_MESSAGE,
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
            setDialogData((state) => ({ ...state, open: !state.open }));
            handleToggleRestaurant(restaurant);
        };
        setDialogData(() => ({
            open: true,
            title: `${restaurant.isOpen ? discoveryContent.CLOSE : discoveryContent.OPEN}`,
            message: `${restaurant.isOpen ? discoveryContent.CLOSE_MESSAGE : discoveryContent.OPEN_MESSAGE}`,
            onConfirm: () => {
                confirmToggle();
            },
        }));
    };

    return (
        <DiscoveryContainer>
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
            <Grid container>
                <Grid size={8}>
                    <Typography variant="h1">Discover Restaurants</Typography>
                </Grid>
                {showAddRestaurant && (
                    <Grid
                        size={4}
                        container
                        justifyContent="end"
                        alignItems="center"
                    >
                        <RestaurantButton
                            variant="contained"
                            onClick={handleAddRestaurant}
                        >
                            {discoveryContent.ADD_RESTAURANT_BUTTON}
                        </RestaurantButton>
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={4}>
                {restaurants?.length === 0 && (
                    <RestaurantNotFound>
                        <ErrorIcon fontSize="large" color="error" />
                        <Typography variant="h3">
                            {discoveryContent.NO_RESTAURANT_MESSAGE}
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
                        <Skeleton animation="wave" height={20} width="80%" />
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
        </DiscoveryContainer>
    );
};

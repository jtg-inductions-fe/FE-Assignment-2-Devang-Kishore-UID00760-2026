import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Error } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { AddMenuItem } from '@components/addMenuItem/AddMenuItem';
import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog';
import { RestaurantBanner } from '@components/restaurantBanner';
import { permissions } from '@config/permissions.config';
import { ROUTES } from '@constants';
import { MenuItemFormData } from '@containers/addEditRestaurant/AddEditRestaurant.types';
import { MenuItemDisplayCard } from '@containers/menuItemCard/MenuItemDisplayCard.container';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { usePermissions } from '@hooks/usePermissions';
import { addToCart, clearCart } from '@store/slices/cart/cartSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import {
    createMenuEntry,
    fetchMenu,
    removeMenuEntry,
    updateMenuEntry,
} from '@store/slices/menu/menuSlice';
import {
    fetchRestaurantByID,
    updateRestaurantData,
} from '@store/slices/restaurant/restaurantSlice';
import {
    ConfirmationDialogProps,
    Cuisine,
    FoodType,
    MenuItem,
    Restaurant,
    SnackbarTheme,
} from '@types';

import { MenuItemSchema } from './AddMenuItem.validation';
import { restaurantMenuContent } from './restaurantMenu.constants';
import {
    EmptyMenu,
    MenuHeader,
    MenuItemsContainer,
    RestaurantMenuContainer,
} from './RestaurantMenu.styled';

export const RestaurantMenuPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const selectedRestaurant = useAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );

    const { hasPermission } = usePermissions();
    const menuItems = useAppSelector((state) => state.menu.items);
    const items = useAppSelector((state) => state.cart.items);
    const currentCuisines = selectedRestaurant?.cuisines.filter((cuisine) =>
        menuItems.some((item) => item.cuisine === cuisine),
    );

    useEffect(() => {
        if (!id) return;
        dispatch(fetchRestaurantByID(id))
            .unwrap()
            .then(async () => {
                await dispatch(fetchMenu({ restaurantId: id })).unwrap();
            })
            .catch(() => {
                dispatch(
                    showSnackbar({
                        message: `${restaurantMenuContent.RESTAURANT_FETCH_ERROR}`,
                        severity: SnackbarTheme.ERROR,
                    }),
                );
            });
    }, [id, dispatch]);

    const handleAddToCart = async (item: MenuItem) => {
        const existingRestaurantId =
            items.length > 0 ? items[0].item.restaurantID : '';
        if (
            !existingRestaurantId ||
            existingRestaurantId === selectedRestaurant?.id
        ) {
            try {
                await dispatch(addToCart(item)).unwrap();
            } catch (error) {
                dispatch(
                    showSnackbar({
                        message: `${error as string}`,
                        severity: SnackbarTheme.ERROR,
                    }),
                );
            }
            dispatch(
                showSnackbar({
                    message: `${restaurantMenuContent.ITEM_ADDED_MESSAGE}`,
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
            return;
        }

        const onConfirm = async () => {
            try {
                await dispatch(clearCart()).unwrap();
            } catch (error) {
                dispatch(
                    showSnackbar({
                        message: `${error as string}`,
                        severity: SnackbarTheme.ERROR,
                    }),
                );
            }
            try {
                await dispatch(addToCart(item)).unwrap();
            } catch (error) {
                dispatch(
                    showSnackbar({
                        message: `${error as string}`,
                        severity: SnackbarTheme.ERROR,
                    }),
                );
            }
            dispatch(
                showSnackbar({
                    message: `${restaurantMenuContent.ITEM_ADDED_MESSAGE}`,
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
            setDialogData((state) => ({
                ...state,
                open: false,
            }));
        };
        setDialogData({
            open: true,
            title: `${restaurantMenuContent.DIFFERENT_RESTAURANTS_ALERT_TITLE}`,
            message: `${restaurantMenuContent.DIFFERENT_RESTAURANTS_ALERT_MESSAGE}`,
            onConfirm: () => void onConfirm(),
        });
    };
    const [addMenu, setAddMenu] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEditingTime, setIsEditingTime] = useState(false);
    const [openingTime, setOpeningTime] = useState(
        selectedRestaurant?.openingTime,
    );
    const [closingTime, setClosingTime] = useState(
        selectedRestaurant?.closingTime,
    );
    const defaultData = {
        name: '',
        description: '',
        category: FoodType.VEG,
        cuisine: Cuisine.INDIAN,
        price: 0,
        stock: 0,
        image: '',
    };
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<MenuItemFormData>({
        resolver: yupResolver(MenuItemSchema),
        defaultValues: defaultData,
    });

    const navigate = useNavigate();
    const [currentItemId, setCurrentItemId] = useState('');
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

    const handleEditSubmit = async (data: MenuItemFormData) => {
        try {
            await dispatch(
                updateMenuEntry({
                    id: currentItemId,
                    data: {
                        restaurantID: selectedRestaurant?.id,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category,
                        image: data.image,
                        cuisine: data.cuisine,
                        stock: data.stock,
                    },
                }),
            ).unwrap();
            dispatch(
                showSnackbar({
                    message: `${restaurantMenuContent.ITEM_ADDED_MESSAGE}`,
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
            setAddMenu((state) => !state);
            setIsEditMode(false);
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    const onSubmit = async (data: MenuItemFormData) => {
        try {
            await dispatch(
                createMenuEntry({
                    restaurantID: selectedRestaurant?.id ?? '',
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    image: data.image,
                    cuisine: data.cuisine,
                    stock: data.stock,
                }),
            ).unwrap();
            dispatch(
                showSnackbar({
                    message: `${restaurantMenuContent.ITEM_ADDED_MESSAGE}`,
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
            setAddMenu((state) => !state);
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    const handleOpen = () => {
        reset(defaultData);
        setAddMenu((state) => !state);
    };

    const handleBack = () => void navigate(ROUTES.DISCOVERY);

    const handleDelete = (ItemId: string) => {
        const confirmDelete = () => {
            setDialogData((state) => ({ ...state, open: !state.open }));
            return void dispatch(removeMenuEntry(ItemId));
        };

        setDialogData(() => ({
            open: true,
            title: `${restaurantMenuContent.DELETE_ITEM_ALERT_TITLE}`,
            message: `${restaurantMenuContent.DELETE_ITEM_ALERT_MESSAGE}`,
            onConfirm: () => {
                confirmDelete();
            },
        }));
    };

    const handleItemEdit = (item: MenuItem) => {
        setCurrentItemId(item.id);
        reset(item);
        setIsEditMode((state) => !state);
        setAddMenu((state) => !state);
    };

    const handleSaveTimings = async () => {
        try {
            await dispatch(
                updateRestaurantData({
                    id: selectedRestaurant?.id ?? '',
                    data: {
                        openingTime: openingTime,
                        closingTime: closingTime,
                    },
                }),
            ).unwrap();
            setIsEditingTime((state) => !state);
        } catch {
            dispatch(
                showSnackbar({
                    message: `${restaurantMenuContent.UPDATE_TIMINGS_ERROR}`,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    return (
        <RestaurantMenuContainer>
            <RestaurantBanner
                restaurant={selectedRestaurant as Restaurant}
                handleBack={handleBack}
                isEditingTime={isEditingTime}
                setIsEditingTime={setIsEditingTime}
                openingTime={openingTime ?? ''}
                closingTime={closingTime ?? ''}
                setOpeningTime={setOpeningTime}
                setClosingTime={setClosingTime}
                handleSaveTimings={() => void handleSaveTimings()}
                showEdit={hasPermission(permissions.SHOW_TIMINGS_EDIT)}
            />
            <MenuHeader>
                <Box>
                    <Typography variant="h3">
                        {restaurantMenuContent.MENU_SECTION_HEADING}
                    </Typography>
                </Box>
                <Box>
                    {hasPermission(permissions.SHOW_ADD_ITEM) && (
                        <Button variant="contained" onClick={handleOpen}>
                            {restaurantMenuContent.ADD_ITEM_BUTTON}
                        </Button>
                    )}
                </Box>
            </MenuHeader>
            {currentCuisines?.length === 0 && (
                <EmptyMenu>
                    <Error fontSize="large" color="error" />
                    <Typography variant="h3">
                        {restaurantMenuContent.NO_ITEM_FOUND}
                    </Typography>
                </EmptyMenu>
            )}
            <MenuItemsContainer container spacing={8}>
                {currentCuisines?.map((cuisineName) => (
                    <Grid size={12} spacing={2} key={cuisineName}>
                        <Typography variant="h4" color="textSecondary">
                            {cuisineName}
                        </Typography>
                        <Divider />
                        {menuItems?.map((item) => {
                            const isPresent = items.find(
                                (cartItem) => cartItem.item.id === item.id,
                            );
                            if (item.cuisine == cuisineName) {
                                return (
                                    <Grid
                                        size={{ xs: 12, lg: 6 }}
                                        key={item.name}
                                        mt={2}
                                    >
                                        <MenuItemDisplayCard
                                            menuItem={item}
                                            presentInCart={
                                                isPresent ? true : false
                                            }
                                            canEdit={hasPermission(
                                                permissions.EDIT_MENU_ITEM,
                                            )}
                                            canAddInCart={hasPermission(
                                                permissions.SHOW_CART,
                                            )}
                                            canDelete={hasPermission(
                                                permissions.DELETE_MENU_ITEM,
                                            )}
                                            onEdit={() => {
                                                handleItemEdit(item);
                                            }}
                                            onDelete={() => {
                                                handleDelete(item.id);
                                            }}
                                            onClick={() =>
                                                void handleAddToCart(item)
                                            }
                                        />
                                    </Grid>
                                );
                            }
                        })}
                    </Grid>
                ))}
            </MenuItemsContainer>
            <AddMenuItem
                open={addMenu}
                handleClose={() => setAddMenu((state) => !state)}
                isEditMode={isEditMode}
                handleSubmitForm={() =>
                    isEditMode
                        ? void handleSubmit(handleEditSubmit)()
                        : void handleSubmit(onSubmit)()
                }
                control={control}
                errors={errors}
            />

            <ConfirmDialog
                open={dialogData.open}
                title={dialogData.title}
                message={dialogData.message}
                confirmLabel={restaurantMenuContent.CONFIRM_LABEL}
                onCancel={() => {
                    handleCancel();
                }}
                onConfirm={dialogData.onConfirm}
            />
        </RestaurantMenuContainer>
    );
};

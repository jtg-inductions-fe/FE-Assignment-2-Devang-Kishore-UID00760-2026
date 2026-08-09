import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { AddMenuItem } from '@components/addMenuItem/AddMenuItem';
import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog/ConfirmationDialog';
import { RestaurantBanner } from '@components/restaurantBanner';
import { permissions } from '@config/permissions.config';
import { MenuItemDisplayCard } from '@containers/menuItemCard/MenuItemDisplayCard.container';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePermissions } from '@hooks/permissionsHook';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { addToCart, clearCart } from '@store/slices/cartSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';
import {
    createMenuEntry,
    fetchMenu,
    removeMenuEntry,
    updateMenuEntry,
} from '@store/slices/menuSlice';
import {
    fetchRestaurantByID,
    updateRestaurantData,
} from '@store/slices/restaurantSlice';
import {
    ConfirmationDialogProps,
    Cuisine,
    FoodType,
    MenuItem,
    MenuItemFormData,
    Restaurant,
} from '@types';

import { MenuItemSchema } from './AddMenuItem.validation';
import {
    MenuHeader,
    MenuItemsContainer,
    RestaurantMenuContainer,
} from './RestaurantMenu.styled';
import { ROUTES } from '../../constants';

export const RestaurantMenu = () => {
    const { id } = useParams();
    const dispatch = UseAppDispatch();

    const selectedRestaurant = UseAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );

    const hasPermission = usePermissions();
    const menuItems = UseAppSelector((state) => state.menu.items);
    const items = UseAppSelector((state) => state.cart.items);

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
                        message: 'Error while fetching restaurant data.',
                        severity: 'error',
                    }),
                );
            });
    }, [id, dispatch]);

    const handleAddToCart = (item: MenuItem) => {
        const existingRestaurantId =
            items.length > 0 ? items[0].item.restaurantID : '';
        if (
            !existingRestaurantId ||
            existingRestaurantId === selectedRestaurant?.id
        ) {
            dispatch(addToCart(item));
            dispatch(
                showSnackbar({
                    message: 'Item Added successfully.',
                    severity: 'success',
                }),
            );
            return;
        }

        setDialogData({
            open: true,
            title: 'Different Restaurant',
            message:
                'your cart contains items from another restaurant.Do you want to clear your cart and add this items?',
            onConfirm: () => {
                dispatch(clearCart());
                dispatch(addToCart(item));
                dispatch(
                    showSnackbar({
                        message: 'Item Added successfully.',
                        severity: 'success',
                    }),
                );
                setDialogData((state) => ({
                    ...state,
                    open: false,
                }));
            },
        });
    };
    const FOOD_TYPES = ['veg', 'nonVeg', 'both'];

    const CUISINES = [
        'Indian',
        'Chinese',
        'Italian',
        'Mexican',
        'Thai',
        'Japanese',
        'American',
        'Fast Food',
        'Desserts',
        'Beverages',
    ];

    const [addMenu, setAddMenu] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEditingTime, setIsEditingTime] = useState(false);
    const [openingTime, setOpeningTime] = useState(
        selectedRestaurant?.openingTime,
    );
    const [closingTime, setClosingTime] = useState(
        selectedRestaurant?.closingTime,
    );
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<MenuItemFormData>({
        resolver: yupResolver(MenuItemSchema),
        defaultValues: {
            name: '',
            description: '',
            category: 'veg',
            cuisine: 'Indian',
            price: 0,
            stock: 0,
            image: '',
        },
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
                    message: 'Item edited successfully.',
                    severity: 'success',
                }),
            );
            setAddMenu((state) => !state);
            setIsEditMode((state) => !state);
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: 'error',
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
                    message: 'Item added successfully.',
                    severity: 'success',
                }),
            );
            setAddMenu((state) => !state);
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: 'error',
                }),
            );
        }
    };

    const handleOpen = () => {
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
            title: `Delete Menu Item`,
            message: 'Do you want to delete Menu Item?',
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
                    message: 'error while updating restaurant timings',
                    severity: 'error',
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
                handleSaveTimings={() => void handleSaveTimings}
                showEdit={hasPermission(permissions.SHOW_TIMINGS_EDIT)}
            />
            <MenuHeader>
                <Box>
                    <Typography variant="h3">Menu Items</Typography>
                </Box>
                <Box>
                    {hasPermission(permissions.SHOW_ADD_ITEM) && (
                        <Button variant="contained" onClick={handleOpen}>
                            + Add New Item
                        </Button>
                    )}
                </Box>
            </MenuHeader>
            <MenuItemsContainer container spacing={8}>
                {menuItems?.map((item) => (
                    <Grid size={{ xs: 12, lg: 6 }} key={item.name}>
                        <MenuItemDisplayCard
                            menuItem={item}
                            canEdit={hasPermission(permissions.EDIT_MENU_ITEM)}
                            canAddInCart={hasPermission(permissions.SHOW_CART)}
                            canDelete={hasPermission(
                                permissions.DELETE_MENU_ITEM,
                            )}
                            onEdit={() => {
                                handleItemEdit(item);
                            }}
                            onDelete={() => {
                                handleDelete(item.id);
                            }}
                            onClick={() => handleAddToCart(item)}
                        />
                    </Grid>
                ))}
            </MenuItemsContainer>
            <AddMenuItem
                open={addMenu}
                handleClose={() => setAddMenu((state) => !state)}
                handleSubmitForm={() =>
                    isEditMode
                        ? void handleSubmit(handleEditSubmit)
                        : void handleSubmit(onSubmit)
                }
                control={control}
                cuisines={CUISINES as Cuisine[]}
                foodTypes={FOOD_TYPES as FoodType[]}
                errors={errors}
            />

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
        </RestaurantMenuContainer>
    );
};

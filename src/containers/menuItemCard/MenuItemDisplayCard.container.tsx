import { MenuItemCard } from '@components/menuItemCard/MenuItemCard';
import { permissions } from '@config/permissions.config';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { usePermissions } from '@hooks/usePermissions';
import { updateQuantity } from '@store/slices/cart/cartSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { updateMenuEntry } from '@store/slices/menu/menuSlice';
import { MenuItemsContainer, SnackbarTheme } from '@types';

export const MenuItemDisplayCard = (props: MenuItemsContainer) => {
    const {
        menuItem,
        presentInCart,
        canEdit,
        canDelete,
        canAddInCart,
        onClick,
        onEdit,
        onDelete,
    } = props;
    const stock = menuItem.stock;
    const dispatch = useAppDispatch();
    const { hasPermission } = usePermissions();
    const selectedRestaurant = useAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );
    const cart = useAppSelector((state) => state.cart);
    const quantity = cart.items.find(
        (cartItem) => cartItem.item.id === menuItem.id,
    )?.quantity;
    const stockChange = async (newValue: number) => {
        try {
            await dispatch(
                updateMenuEntry({ id: menuItem.id, data: { stock: newValue } }),
            ).unwrap();
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    const handleStockDecrement = async () => {
        const newValue = Math.max(0, stock - 1);
        await stockChange(newValue);
    };
    const handleItemChange = async (itemId: string, ItemQuantity: number) => {
        try {
            await dispatch(
                updateQuantity({ itemId, quantity: ItemQuantity }),
            ).unwrap();
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    const handleDecrease = (itemId: string) => {
        const cartItem = cart.items.find((item) => item.item.id === itemId);
        if (!cartItem) {
            return;
        }
        void handleItemChange(itemId, cartItem.quantity - 1);
    };

    return (
        <MenuItemCard
            menuItem={menuItem}
            canEdit={canEdit}
            canAddInCart={canAddInCart}
            canDelete={canDelete}
            onEdit={onEdit}
            onDelete={onDelete}
            onClick={onClick}
            stock={stock}
            onChange={(itemId: string, ItemQuantity: number) =>
                void handleItemChange(itemId, ItemQuantity)
            }
            onDecrease={handleDecrease}
            quantity={quantity ?? 0}
            presentInCart={presentInCart}
            isCartDisabled={stock == 0 || !(selectedRestaurant?.isOpen ?? true)}
            changeStock={() => void stockChange}
            onBlur={(value: number) => void stockChange(value)}
            onDecrement={() => void handleStockDecrement()}
            canChangeStock={hasPermission(permissions.EDIT_STOCK)}
        />
    );
};

import { MenuItemCard } from '@components/menuItemCard/MenuItemCard';
import { permissions } from '@config/permissions.config';
import { usePermissions } from '@hooks/permissionsHook';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { updateQuantity } from '@store/slices/cartSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';
import { updateMenuEntry } from '@store/slices/menuSlice';
import { MenuItemsContainer } from '@types';

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
    const dispatch = UseAppDispatch();
    const hasPermission = usePermissions();
    const selectedRestaurant = UseAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );
    const cart = UseAppSelector((state) => state.cart);
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
                    severity: 'error',
                }),
            );
        }
    };

    const handleStockDecrement = async () => {
        const newValue = Math.max(0, stock - 1);
        await stockChange(newValue);
    };
    const handleItemChange = (itemId: string, ItemQuantity: number) => {
        dispatch(updateQuantity({ itemId, quantity: ItemQuantity }));
    };

    const handleDecrease = (itemId: string) => {
        const cartItem = cart.items.find((item) => item.item.id === itemId);
        if (!cartItem) {
            return;
        }
        handleItemChange(itemId, cartItem.quantity - 1);
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
            onChange={handleItemChange}
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

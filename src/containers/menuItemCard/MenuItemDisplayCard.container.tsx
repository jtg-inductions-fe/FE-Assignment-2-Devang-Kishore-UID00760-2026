import { MenuItemCard } from '@components/menuItemCard/MenuItemCard';
import { permissions } from '@config/permissions.config';
import { usePermissions } from '@hooks/permissionsHook';
import { UseAppDispatch } from '@hooks/storeHooks';
import { showSnackbar } from '@store/slices/feedBackSlice';
import { updateMenuEntry } from '@store/slices/menuSlice';
import { MenuItemsContainer } from '@types';

export const MenuItemDisplayCard = (props: MenuItemsContainer) => {
    const {
        menuItem,
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
            changeStock={() => void stockChange}
            onBlur={(value: number) => void stockChange(value)}
            onDecrement={() => void handleStockDecrement}
            canChangeStock={hasPermission(permissions.EDIT_STOCK)}
        />
    );
};

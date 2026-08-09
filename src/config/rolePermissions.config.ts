import { permissions } from './permissions.config';
export const rolePermissions = {
    owner: [
        permissions.ADD_RESTAURANT,
        permissions.DELETE_RESTAURANT,
        permissions.EDIT_RESTAURANT,
        permissions.OPEN_RESTAURANT,
        permissions.DELETE_MENU_ITEM,
        permissions.EDIT_MENU_ITEM,
        permissions.SHOW_TIMINGS_EDIT,
        permissions.EDIT_STOCK,
        permissions.SHOW_ADD_ITEM,
    ],
    customer: [permissions.SHOW_CART, permissions.SHOW_CUISINES_GRID],
};

import { permissions } from './permissions.config';
export const rolePermissions = {
    owner: [
        permissions.ADD_RESTAURANT,
        permissions.DELETE_RESTAURANT,
        permissions.EDIT_RESTAURANT,
        permissions.OPEN_RESTAURANT,
    ],
    customer: [permissions.SHOW_CART, permissions.SHOW_CUISINES_GRID],
};

import { Control, FieldErrors, FieldValues } from 'react-hook-form';

import { Cuisine, FoodType, MenuItem } from '@types';

import { MenuItemFormData } from './AddRestaurant.types';

export interface MenuFormContainer {
    open: boolean;
    control: Control<MenuItemFormData>;
    errors: FieldErrors<MenuItemFormData>;
    cuisines: Cuisine[];
    foodTypes: FoodType[];
    handleClose: () => void;
    handleSubmitForm: () => void;
}

export interface MenuItemCardProps {
    menuItem: MenuItem;
    stock: number;
    canEdit: boolean;
    canDelete: boolean;
    canAddInCart: boolean;
    canChangeStock: boolean;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
    changeStock: (value: number) => void;
    onBlur: (value: number) => void;
    onDecrement: () => void;
}

export interface RestaurantMenuItemProps<T extends FieldValues> {
    index?: number;
    showDelete: boolean;
    control: Control<T>;
    cuisines: Cuisine[];
    foodTypes: FoodType[];
    onDelete?: () => void;
    errors: FieldErrors<T>;
}

export interface MenuItemsContainer {
    menuItem: MenuItem;
    canEdit: boolean;
    canDelete: boolean;
    canAddInCart: boolean;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

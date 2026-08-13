import { Control, FieldErrors, FieldValues } from 'react-hook-form';

import { Cuisine, FoodType, MenuItem } from '@types';

export interface MenuItemFormData {
    name: string;
    description?: string;
    cuisine: Cuisine;
    category: FoodType;
    price: number;
    stock: number;
    image?: string;
}

export interface MenuFormContainer {
    open: boolean;
    control: Control<MenuItemFormData>;
    errors: FieldErrors<MenuItemFormData>;
    isEditMode: boolean;
    handleClose: () => void;
    handleSubmitForm: () => void;
}

export interface MenuItemCardProps {
    menuItem: MenuItem;
    stock: number;
    presentInCart: boolean;
    quantity: number;
    onChange: (id: string, quantity: number) => void;
    onDecrease: (id: string) => void;
    canEdit: boolean;
    canDelete: boolean;
    canAddInCart: boolean;
    canChangeStock: boolean;
    isCartDisabled: boolean;
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
    onDelete?: () => void;
}

export interface MenuItemsContainer {
    menuItem: MenuItem;
    presentInCart: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canAddInCart: boolean;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

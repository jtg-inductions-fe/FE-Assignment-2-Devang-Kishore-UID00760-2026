import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export enum FoodType {
    VEG = 'VEG',
    NON_VEG = 'NON_VEG',
}
export enum Cuisine {
    INDIAN = 'Indian',
    CHINESE = 'Chinese',
    ITALIAN = 'Italian',
    MEXICAN = 'Mexican',
    THAI = 'Thai',
    JAPANESE = 'Japanese',
    AMERICAN = 'American',
    FAST_FOOD = 'Fast Food',
    DESSERT = 'Desserts',
    BEVERAGE = 'Beverages',
}

export interface MenuItem {
    id: string;
    name: string;
    restaurant_id: string;
    description?: string;
    food_type: FoodType;
    price_amount: number;
    image_link?: string;
    stock: number;
    cuisine: Cuisine;
}

export interface MenuItemFormData {
    name: string;
    description?: string;
    cuisine: Cuisine;
    food_type: FoodType;
    price_amount: number;
    stock: number;
    image_link?: string;
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

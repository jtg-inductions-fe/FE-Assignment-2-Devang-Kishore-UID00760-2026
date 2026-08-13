export type { FeedbackComponentType } from './feedback.types';
export type { FiltersData } from './filters.type';
export type { ConfirmationDialogProps } from './confirmationDialog.types';
export type { VegToggleProps } from './vegToggle.types';
export type { BadgeIconButtonProps } from './badgeIconButton.types';
export type { SearchbarProps } from './searchbarProps.types';
export type { ProfileMenuProps } from './profileMenu.types';
export type {
    MenuFormContainer,
    MenuItemCardProps,
    RestaurantMenuItemProps,
    MenuItemsContainer,
    MenuItemFormData,
} from './MenuItemCard.types';

export type { UserData } from './users.types';
export type { OrderData } from './orders.types';

export enum Role {
    CUSTOMER = 'customer',
    OWNER = 'owner',
}
export enum FoodType {
    VEG = 'veg',
    NON_VEG = 'nonVeg',
    BOTH = 'both',
}
export enum OrderStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    PREPARING = 'preparing',
    OUT_FOR_DELIVERY = 'outForDelivery',
    DELIVERY = 'delivered',
    REJECTED = 'rejected',
}

export enum SnackbarTheme {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
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

export enum Day {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday',
}

export interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    password: string;
}

export interface MenuItem {
    id: string;
    name: string;
    restaurantID: string;
    description?: string;
    category: FoodType;
    price: number;
    image?: string;
    stock: number;
    cuisine: Cuisine;
}

export interface Restaurant {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    contactNumber: string;
    email: string;
    fssaiCertificateId: string;
    gstNumber: string;
    cuisines: Cuisine[];
    category: FoodType;
    image?: string;
    logo?: string;
    address: Address;
    isOpen: boolean;
    openingTime: string;
    closingTime: string;
    workingDays: Day[];
}

export interface CartItem {
    item: MenuItem;
    quantity: number;
}

export interface Order {
    id: string;
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
    status: OrderStatus;
    subtotal: number;
    createdAt: string;
}

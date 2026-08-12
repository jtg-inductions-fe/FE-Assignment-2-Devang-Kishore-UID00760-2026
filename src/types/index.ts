export type { ImagePreviewProps } from './imagePreview.types';
export type { CustomSelectProps } from './customSelect.types';
export type { ToggleSwitchProps } from './toggleSwitch.types';
export type {
    MenuItemFormData,
    AddRestaurantFormData,
} from './AddRestaurant.types';
export type { ConfirmationDialogProps } from './confirmationDialog.types';

export type { FeedbackComponentType } from './feedback.types';
export type { UserData } from './users.types';
export type { OrderData } from './orders.types';
export enum Role {
    customer = 'customer',
    owner = 'owner',
}
export enum FoodType {
    veg = 'veg',
    nonVeg = 'nonVeg',
    both = 'both',
}
export enum OrderStatus {
    pending = 'pending',
    accepted = 'accepted',
    preparing = 'preparing',
    outForDelivery = 'outForDelivery',
    delivered = 'delivered',
    rejected = 'rejected',
}

export enum SnackbarTheme {
    success = 'success',
    error = 'error',
    warning = 'warning',
    info = 'info',
}
export enum Cuisine {
    indians = 'Indians',
    chinese = 'Chinese',
    italian = 'Italian',
    mexican = 'Mexican',
    thai = 'Thai',
    japanese = 'Japanese',
    american = 'American',
    fast_Food = 'Fast Food',
    desserts = 'Desserts',
    beverages = 'Beverages',
}

export enum Day {
    monday = 'Monday',
    tuesday = 'Tuesday',
    wednesday = 'Wednesday',
    thursday = 'Thursday',
    friday = 'Friday',
    saturday = 'Saturday',
    sunday = 'Sunday',
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

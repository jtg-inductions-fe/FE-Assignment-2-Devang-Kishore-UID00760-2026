export type { FeedBackState, FeedbackComponentType } from './feedback.types';
export type { ConfirmationDialogProps } from './confirmationDialog.types';
export type Role = 'customer' | 'owner';
export type FoodType = 'veg' | 'nonVeg' | 'both';
export type OrderStatus =
    | 'pending'
    | 'accepted'
    | 'preparing'
    | 'outForDelivery'
    | 'delivered'
    | 'rejected';
export type SnackbarTheme = 'success' | 'error' | 'warning' | 'info';
export type Cuisine =
    | 'Indian'
    | 'Chinese'
    | 'Italian'
    | 'Mexican'
    | 'Thai'
    | 'Japanese'
    | 'American'
    | 'Fast Food'
    | 'Desserts'
    | 'Beverages';
export type Day =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';

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
    description: string;
    category: FoodType;
    price: number;
    image: string;
    stock: number;
    cuisine: Cuisine;
}

export interface Restaurant {
    id: string;
    ownerId: string;
    name: string;
    description: string;
    contactNumber: string;
    email: string;
    fssaiCertificateId: string;
    gstNumber: string;
    cuisines: Cuisine[];
    category: FoodType;
    image: string;
    logo: string;
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

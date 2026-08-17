import { MenuItem } from './menItem.types';

export interface CartItem {
    item: MenuItem;
    quantity: number;
}

export interface CartContentProps {
    items: CartItem[];
    subtotal: number;
    bookingFee: number;
    total: number;
    onClose: () => void;
    onChange: (id: string, quantity: number) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
    onCheckout: () => void;
}

export interface CartItemProps {
    item: CartItem;
    onChange: (id: string, quantity: number) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
}

export interface CartSummaryProps {
    subTotal: number;
    bookingFee: number;
    total: number;
    onCheckout: () => void;
}

export interface CartDialogProps extends CartContentProps {
    open: boolean;
}

export interface CartDrawerProps extends CartContentProps {
    open: boolean;
}

export interface CartContainerProps {
    open: boolean;
    onClose: () => void;
}

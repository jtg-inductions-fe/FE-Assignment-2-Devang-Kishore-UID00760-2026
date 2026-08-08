import { Restaurant } from '@types';

export interface RestaurantCardProps {
    Restaurant: Restaurant;
    onEdit: () => void;
    onDelete: () => void;
    onToggle: () => void;
    canEdit: boolean;
    canDelete: boolean;
    canOpen: boolean;
    formStateTime: (time: string) => string;
}

export interface RestaurantBannerProps {
    restaurant: Restaurant;
    openingTime: string;
    closingTime: string;
    showEdit: boolean;
    isEditingTime: boolean;
    handleBack: () => void;
    setIsEditingTime: (value: boolean) => void;
    setOpeningTime: (value: string) => void;
    setClosingTime: (value: string) => void;
    handleSaveTimings: () => void;
}

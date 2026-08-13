import { Restaurant } from '@types';

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

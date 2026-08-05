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

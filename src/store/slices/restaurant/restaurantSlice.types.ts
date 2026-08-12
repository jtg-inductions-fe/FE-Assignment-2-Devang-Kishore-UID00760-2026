import { Restaurant } from '@types';

export interface RestaurantState {
    items: Restaurant[];
    loading: boolean;
    error: string | null;
}

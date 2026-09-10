import { Restaurant } from '@types';

export interface RestaurantState {
    items: Restaurant[];
    loading: boolean;
    error: string | null;
    pageSize:number,
    nextCursor: string| null,
    hasMore: boolean,
    selectedRestaurant: Restaurant | null;
}

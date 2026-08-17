export enum FoodType {
    VEG = 'Veg',
    NON_VEG = 'Non Veg',
    BOTH = 'Both',
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
    restaurantID: string;
    description?: string;
    category: FoodType;
    price: number;
    image?: string;
    stock: number;
    cuisine: Cuisine;
}

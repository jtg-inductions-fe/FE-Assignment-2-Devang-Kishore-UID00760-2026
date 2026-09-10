import { Cuisine, Day, FoodType } from '@types';

/**
 * Food Types.
 * @constant
 */
export const FOOD_TYPES: FoodType[] = [
    FoodType.VEG,
    FoodType.NON_VEG,
];

/**
 * Food Cuisines.
 * @constant
 */
export const CUISINES: Cuisine[] = [
    Cuisine.INDIAN,
    Cuisine.CHINESE,
    Cuisine.ITALIAN,
    Cuisine.MEXICAN,
    Cuisine.AMERICAN,
    Cuisine.JAPANESE,
    Cuisine.THAI,
    Cuisine.FAST_FOOD,
    Cuisine.DESSERT,
    Cuisine.BEVERAGE,
];

/**
 * Restaurant State.
 * @constant
 */
export const RESTAURANT_STATE = { OPEN: 'Open', CLOSE: 'Close' };

/**
 * WeekDays.
 * @constant
 */
export const DAYS: Day[] = [
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY,
    Day.SATURDAY,
    Day.SUNDAY,
];

export const RESTAURANT_TEXT_CONTENT = {
    RESTAURANT_NOT_FOUND: 'Restaurant not Found',
};

export const PAGE_SIZE=10
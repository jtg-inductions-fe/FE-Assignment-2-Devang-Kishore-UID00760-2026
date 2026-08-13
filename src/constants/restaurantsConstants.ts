import { Cuisine, Day, FoodType } from '@types';

/**
 * Food Types.
 * @constant
 */
export const FOOD_TYPES: FoodType[] = [
    FoodType.VEG,
    FoodType.NON_VEG,
    FoodType.BOTH,
];

/**
 * Food Cuisines.
 * @constant
 */
export const CUISINES: Cuisine[] = [
    Cuisine.INDIAN,
    Cuisine.CHINESE,
    Cuisine.ITALIAN,
    Cuisine.AMERICAN,
    Cuisine.THAI,
    Cuisine.CHINESE,
    Cuisine.FAST_FOOD,
    Cuisine.DESSERT,
    Cuisine.BEVERAGE,
];

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

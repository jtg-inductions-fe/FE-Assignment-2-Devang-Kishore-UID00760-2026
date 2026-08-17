import * as yup from 'yup';

import { CUISINES, FOOD_TYPES } from '@constants';
import { Cuisine, FoodType } from '@types';

import { restaurantMenuContent } from './restaurantMenu.constants';

export const MenuItemSchema = yup.object({
    name: yup.string().trim().required(restaurantMenuContent.NAME_REQUIRED),
    description: yup.string().trim(),

    cuisine: yup
        .mixed<Cuisine>()
        .oneOf(CUISINES)
        .required(restaurantMenuContent.CUISINE_REQUIRED),

    category: yup
        .mixed<FoodType>()
        .oneOf(FOOD_TYPES)
        .required(restaurantMenuContent.CATEGORY_REQUIRED),

    price: yup
        .number()
        .typeError(restaurantMenuContent.PRICE_REQUIRED)
        .positive(restaurantMenuContent.POSITIVE_PRICE)
        .required(restaurantMenuContent.PRICE_REQUIRED),

    stock: yup
        .number()
        .typeError(restaurantMenuContent.STOCK_REQUIRED)
        .min(0, restaurantMenuContent.POSITIVE_PRICE)
        .required(restaurantMenuContent.STOCK_REQUIRED),

    image: yup.string(),
});

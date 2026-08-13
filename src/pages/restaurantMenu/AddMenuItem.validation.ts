import * as yup from 'yup';

import { CUISINES, FOOD_TYPES } from '@constants';
import { Cuisine, FoodType } from '@types';
export const MenuItemSchema = yup.object({
    name: yup.string().trim().required('Item name is required'),
    description: yup.string().trim(),

    cuisine: yup
        .mixed<Cuisine>()
        .oneOf(CUISINES)
        .required('cuisine is required'),

    category: yup
        .mixed<FoodType>()
        .oneOf(FOOD_TYPES)
        .required('Category is required'),

    price: yup
        .number()
        .typeError('Price is required')
        .positive('Price must be greater than 0')
        .required('Price is required'),

    stock: yup
        .number()
        .typeError('Stock is required')
        .min(0, 'Stock cannot be less than 0')
        .required('Stock is required'),

    image: yup.string(),
});

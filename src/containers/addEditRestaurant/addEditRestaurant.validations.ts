import * as yup from 'yup';

import { CUISINES, DAYS, FOOD_TYPES } from '@constants';
import { Cuisine, Day, FoodType } from '@types';

import { addRestaurantContent } from './addEditRestaurant.constants';

export const addRestaurantSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required(addRestaurantContent.RESTAURANT_NAME_REQUIRED),
    description: yup.string().trim(),
    email: yup
        .string()
        .trim()
        .email(addRestaurantContent.EMAIL_VALIDATION)
        .required(addRestaurantContent.EMAIL_REQUIRED),
    country_code:yup.string().trim().required(addRestaurantContent.COUNTRY_CODE_REQUIRED),
    contact_number: yup
        .string()
        .trim()
        .required(addRestaurantContent.RESTAURANT_CONTACT_NUMBER_REQUIRED)
        .matches(
            /^\+?[1-9]\d{9,14}$/,
            addRestaurantContent.RESTAURANT_CONTACT_NUMBER_VALIDATION,
        ),
    food_type: yup
        .mixed<FoodType>()
        .oneOf(FOOD_TYPES)
        .required(addRestaurantContent.RESTAURANT_FOOD_TYPE_REQUIRED),
    cuisines: yup
        .array()
        .of(yup.mixed<Cuisine>().oneOf(CUISINES).required())
        .ensure()
        .min(1, addRestaurantContent.RESTAURANT_CUISINES_VALIDATION)
        .required(addRestaurantContent.RESTAURANT_CUISINES_REQUIRED),
    address: yup.object({
        street: yup
            .string()
            .trim()
            .required(addRestaurantContent.STREET_REQUIRED),
        city: yup.string().trim().required(addRestaurantContent.CITY_REQUIRED),
        state: yup
            .string()
            .trim()
            .required(addRestaurantContent.STATE_REQUIRED),
        pincode: yup
            .string()
            .trim()
            .required(addRestaurantContent.PINCODE_REQUIRED)
            .matches(/^\d+$/, addRestaurantContent.PINCODE_VALIDATION),
    }),
    logo: yup.string(),
    image: yup.string(),
    is_available: yup.boolean().required(),
    opening_time: yup
        .string()
        .required(addRestaurantContent.OPENING_TIME_REQUIRED),
    closing_time: yup
        .string()
        .trim()
        .required(addRestaurantContent.CLOSING_TIME_REQUIRED),
    working_days: yup
        .array()
        .of(
            yup
                .mixed<Day>()
                .oneOf(DAYS)
                .required(addRestaurantContent.DAY_REQUIRED),
        )
        .ensure()
        .min(1, addRestaurantContent.DAY_VALIDATION)
        .required(),
});

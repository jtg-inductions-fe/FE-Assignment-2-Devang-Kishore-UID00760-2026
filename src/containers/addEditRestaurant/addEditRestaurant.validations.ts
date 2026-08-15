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
    contactNumber: yup
        .string()
        .trim()
        .required(addRestaurantContent.RESTAURANT_CONTACT_NUMBER_REQUIRED)
        .matches(
            /^\+?[1-9]\d{9,14}$/,
            addRestaurantContent.RESTAURANT_CONTACT_NUMBER_VALIDATION,
        ),
    category: yup
        .mixed<FoodType>()
        .oneOf(FOOD_TYPES)
        .required(addRestaurantContent.RESTAURANT_CATEGORY_REQUIRED),
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
    isOpen: yup.boolean().required(),
    openingTime: yup
        .string()
        .required(addRestaurantContent.OPENING_TIME_REQUIRED),
    closingTime: yup
        .string()
        .trim()
        .required(addRestaurantContent.CLOSING_TIME_REQUIRED)
        .test(
            addRestaurantContent.CLOSING_TIME_VALIDATION,
            addRestaurantContent.CLOSING_TIME_VALIDATION_ERROR,
            function (value) {
                const { openingTime } = this.parent as { openingTime: string };

                if (!openingTime || !value) {
                    return true;
                }
                return openingTime < value;
            },
        ),
    workingDays: yup
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
    gstNumber: yup.string().trim().required(addRestaurantContent.GST_REQUIRED),
    fssaiCertificateId: yup
        .string()
        .trim()
        .required(addRestaurantContent.FSSAI_REQUIRED),
    menu: yup
        .array()
        .of(
            yup.object({
                name: yup
                    .string()
                    .trim()
                    .required(addRestaurantContent.ITEM_NAME_REQUIRED),
                description: yup.string().trim(),
                cuisine: yup
                    .mixed<Cuisine>()
                    .oneOf(CUISINES)
                    .required(addRestaurantContent.ITEM_CUISINE_REQUIRED),
                category: yup
                    .mixed<FoodType>()
                    .oneOf(FOOD_TYPES)
                    .required(addRestaurantContent.ITEM_CATEGORY_REQUIRED),
                price: yup
                    .number()
                    .typeError(addRestaurantContent.PRICE_REQUIRED)
                    .positive(addRestaurantContent.POSITIVE_PRICE_VALIDATION)
                    .required(addRestaurantContent.PRICE_REQUIRED),
                stock: yup
                    .number()
                    .typeError(addRestaurantContent.ITEM_STOCK_REQUIRED)
                    .min(0, addRestaurantContent.ITEM_STOCK_VALIDATION)
                    .required(addRestaurantContent.ITEM_STOCK_REQUIRED),
                image: yup.string(),
            }),
        )
        .required()
        .min(1, addRestaurantContent.ATLEAST_ONE_ITEM_VALIDATION)
        .ensure(),
});

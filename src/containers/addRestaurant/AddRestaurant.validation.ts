import * as yup from 'yup';

import { Cuisine, Day, FoodType } from '@types';
export const addRestaurantSchema = yup.object({
    name: yup.string().trim().required('Restaurant name is required'),
    description: yup.string().trim(),

    email: yup
        .string()
        .trim()
        .email('Enter a valid email')
        .required('email is required'),

    contactNumber: yup
        .string()
        .trim()
        .required('Contact Number is required')
        .matches(/^\+?[1-9]\d{9,14}$/, 'invalid phone'),

    category: yup
        .mixed<FoodType>()
        .oneOf(['veg', 'nonVeg', 'both'])
        .required('Restaurant category is required'),

    cuisines: yup
        .array()
        .of(
            yup
                .mixed<Cuisine>()
                .oneOf([
                    'Indian',
                    'Chinese',
                    'Italian',
                    'Mexican',
                    'Thai',
                    'Japanese',
                    'American',
                    'Fast Food',
                    'Desserts',
                    'Beverages',
                ])
                .required(),
        )
        .ensure()
        .min(1, 'Select at least one cuisine')
        .required('Cuisines are required'),

    address: yup.object({
        street: yup.string().trim().required('Street is required'),
        city: yup.string().trim().required('City is required'),
        state: yup.string().trim().required('State is required'),
        pincode: yup
            .string()
            .trim()
            .required('Pincode is required')
            .matches(/^\d+$/, 'The field must contain only numbers'),
    }),

    logo: yup.string(),
    image: yup.string(),
    isOpen: yup.boolean(),
    openingTime: yup.string().required('Opening time is required'),

    closingTime: yup
        .string()
        .trim()
        .required('Closing time is required')
        .test(
            'closing-validation',
            'Closing time must be later than opening time.',
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
                .oneOf([
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                ])
                .required('Day is required'),
        )
        .ensure()
        .min(1, 'Select at least one working day'),

    gstNumber: yup.string().trim().required('GST number is required'),
    fssaiCertificateId: yup.string().trim().required('FSSAI ID is required'),

    menu: yup
        .array()
        .of(
            yup.object({
                name: yup.string().trim().required('Item name is required'),
                description: yup.string().trim(),

                cuisine: yup
                    .mixed<Cuisine>()
                    .oneOf([
                        'Indian',
                        'Chinese',
                        'Italian',
                        'Mexican',
                        'Thai',
                        'Japanese',
                        'American',
                        'Fast Food',
                        'Desserts',
                        'Beverages',
                    ])
                    .required('cuisine is required'),

                category: yup
                    .mixed<FoodType>()
                    .oneOf(['veg', 'nonVeg', 'both'])
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
            }),
        )
        .required()
        .min(1, 'Add at least one menu item')
        .ensure(),
});

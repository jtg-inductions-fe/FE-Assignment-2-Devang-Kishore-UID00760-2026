import { Cuisine, FoodType } from '@types';

import { AddRestaurantFormData } from './AddEditRestaurant.types';
export const defaultValues: AddRestaurantFormData = {
    name: '',
    description: '',
    country_code:'+91',
    contact_number: '',
    email: '',
    cuisines: [],
    food_type: FoodType.VEG,
    image_link: '',
    logo_link: '',
    address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
    },
    is_available: true,
    opening_time: '',
    closing_time: '',
    working_days: [],
    menu: [
        {
            name: '',
            description: '',
            food_type: FoodType.VEG,
            cuisine: Cuisine.INDIAN,
            price_amount: 0,
            stock: 0,
            image_link: '',
        },
    ],
};

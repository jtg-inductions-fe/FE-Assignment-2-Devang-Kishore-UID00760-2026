import { Cuisine, FoodType } from '@types';

import { AddRestaurantFormData } from './AddRestaurant.types';
export const defaultValues: AddRestaurantFormData = {
    name: '',
    description: '',
    contactNumber: '',
    email: '',
    fssaiCertificateId: '',
    gstNumber: '',
    cuisines: [],
    category: FoodType.VEG,
    image: '',
    logo: '',
    address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
    },
    isOpen: true,
    openingTime: '',
    closingTime: '',
    workingDays: [],
    menu: [
        {
            name: '',
            description: '',
            category: FoodType.VEG,
            cuisine: Cuisine.INDIAN,
            price: 0,
            stock: 0,
            image: '',
        },
    ],
};

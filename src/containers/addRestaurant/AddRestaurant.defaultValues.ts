import type { AddRestaurantFormData } from '@types';
export const defaultValues: AddRestaurantFormData = {
    name: '',
    description: '',
    contactNumber: '',
    email: '',
    fssaiCertificateId: '',
    gstNumber: '',
    cuisines: [],
    category: 'veg',
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
            category: 'veg',
            cuisine: 'Indian',
            price: 0,
            stock: 0,
            image: '',
        },
    ],
};

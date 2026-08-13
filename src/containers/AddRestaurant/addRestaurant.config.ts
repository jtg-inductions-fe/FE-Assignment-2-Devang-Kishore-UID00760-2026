import { CUISINES, FOOD_TYPES } from '@constants';

import { addRestaurantContent } from './addRestaurant.constants';

export const menuFields = [
    {
        name: 'name',
        type: 'text',
        label: addRestaurantContent.DISH_NAME_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'cuisine',
        type: 'select',
        label: addRestaurantContent.DISH_CUISINE_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
        options: CUISINES,
    },
    {
        name: 'category',
        type: 'select',
        label: addRestaurantContent.DISH_CATEGORY_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
        options: FOOD_TYPES,
    },
    {
        name: 'price',
        type: 'number',
        label: addRestaurantContent.DISH_PRICE_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'stock',
        type: 'number',
        label: addRestaurantContent.DISH_STOCK_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'image',
        type: 'image',
        label: addRestaurantContent.DISH_IMAGE_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'description',
        type: 'text',
        label: addRestaurantContent.DISH_DESCRIPTION_LABEL,
        grid: { xs: 12 },
        multiline: false,
        rows: undefined,
    },
];

export const restaurantBasicInfoFields = [
    {
        name: 'logo',
        type: 'image',
        label: addRestaurantContent.RESTAURANT_LOGO_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'image',
        type: 'image',
        label: addRestaurantContent.RESTAURANT_BANNER_IMAGE_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'fssaiCertificateId',
        type: 'text',
        label: addRestaurantContent.FSSAI_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'gstNumber',
        type: 'text',
        label: addRestaurantContent.GST_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
];

export const addressFields = [
    {
        name: 'address.street',
        type: 'text',
        label: addRestaurantContent.STREET_LABEL,
        grid: { xs: 12 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'address.city',
        type: 'text',
        label: addRestaurantContent.CITY_LABEL,
        grid: { xs: 12, md: 4 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'address.state',
        type: 'text',
        label: addRestaurantContent.STATE_LABEL,
        grid: { xs: 12, md: 4 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'address.pincode',
        type: 'text',
        label: addRestaurantContent.PIN_CODE_LABEL,
        grid: { xs: 12, md: 4 },
        multiline: false,
        rows: undefined,
    },
];

export const restaurantInfoFields = [
    {
        name: 'name',
        type: 'text',
        label: addRestaurantContent.RESTAURANT_NAME_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'description',
        type: 'text',
        label: addRestaurantContent.RESTAURANT_DESCRIPTION_LABEL,
        grid: { xs: 12 },
        multiline: true,
        rows: 4,
    },
    {
        name: 'contactNumber',
        type: 'text',
        label: addRestaurantContent.RESTAURANT_DESCRIPTION_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'email',
        type: 'text',
        label: addRestaurantContent.RESTAURANT_EMAIL_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
    },
    {
        name: 'category',
        type: 'select',
        label: addRestaurantContent.DISH_CATEGORY_LABEL,
        grid: { xs: 12, md: 6 },
        multiline: false,
        rows: undefined,
        options: FOOD_TYPES,
    },
];

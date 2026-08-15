import { Cuisine } from '@types';

export const discoveryContent = {
    RESTAURANT_UPDATE_ERROR: 'error while updating restaurant',
    RESTAURANT_DELETE_TITLE: `Delete Restaurant`,
    RESTAURANT_DELETE_MESSAGE: 'Do you want to delete restaurant?',
    OPEN: 'Open Restaurant',
    CLOSE: 'Close Restaurant',
    OPEN_MESSAGE: 'Do you want to Open Restaurant ?',
    CLOSE_MESSAGE: 'Do you want to close Restaurant ?',
    ADD_RESTAURANT_BUTTON: 'ADD NEW RESTAURANT',
    DISCOVER_RESTAURANT_HEADING: 'Discover Restaurants',
    NO_RESTAURANT_MESSAGE: 'No Restaurant Found',
};

export const CUISINES_IMAGE_LOCATION = '/src/assets/images/cuisines/';

export const cuisinesImage = [
    { label: Cuisine.INDIAN, url: `${CUISINES_IMAGE_LOCATION}indian.webp` },
    { label: Cuisine.CHINESE, url: `${CUISINES_IMAGE_LOCATION}chinese.webp` },
    { label: Cuisine.ITALIAN, url: `${CUISINES_IMAGE_LOCATION}italian.webp` },
    { label: Cuisine.MEXICAN, url: `${CUISINES_IMAGE_LOCATION}mexican.webp` },
    { label: Cuisine.AMERICAN, url: `${CUISINES_IMAGE_LOCATION}american.webp` },
    { label: Cuisine.JAPANESE, url: `${CUISINES_IMAGE_LOCATION}japanese.webp` },
    { label: Cuisine.THAI, url: `${CUISINES_IMAGE_LOCATION}thai.webp` },
    {
        label: Cuisine.FAST_FOOD,
        url: `${CUISINES_IMAGE_LOCATION}fast-food.webp`,
    },
    { label: Cuisine.DESSERT, url: `${CUISINES_IMAGE_LOCATION}dessert.webp` },
    { label: Cuisine.BEVERAGE, url: `${CUISINES_IMAGE_LOCATION}beverage.webp` },
];

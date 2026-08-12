import menuMock from '@data/menu.json';
import { MenuItem } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

const MENU_KEY = 'menu';

/**
 * Fetches menu items stored in local storage.
 * @returns Data of menu items
 */
const getStoredMenu = (): MenuItem[] =>
    readStorage<MenuItem[]>(MENU_KEY, menuMock as MenuItem[]);

/**
 * Stores the menu items in local storage
 * @param menu :Menu items to be stored in local storage.
 */
const saveMenu = (menu: MenuItem[]): void => {
    writeStorage(MENU_KEY, menu);
};

/**
 * Fetches data of menu items served by a restaurant.
 * @param restaurantID :Id of restaurant whose menu needed to be fetched
 * @returns Data of menu items served by the restaurant.
 */
export const getMenu = (restaurantID?: string): Promise<MenuItem[]> => {
    const menu = getStoredMenu();
    const currentMenu = restaurantID
        ? menu.filter((item) => restaurantID === item.restaurantID)
        : menu;
    const menuData = currentMenu;

    return Promise.resolve(menuData);
};

/**
 * Stores menu item corresponding to a restaurant.
 * @param payload :Data of menu item to be stored in local storage.
 * @returns menu item added in local storage.
 */
export const addMenuItem = (
    payload: Omit<MenuItem, 'id'>,
): Promise<MenuItem> => {
    const menu = getStoredMenu();
    const item = { ...payload, id: `M${menu.length + 1}` };
    saveMenu([...menu, item]);

    return Promise.resolve(item);
};

/**
 * Updates the menu item.
 * @param id :Id of Menu item to be changed.
 * @param payload :Data of menu item to be changes.
 * @returns updated menu item.
 */
export const updateMenuItem = (
    id: string,
    payload: Partial<MenuItem>,
): Promise<MenuItem> => {
    const menu = getStoredMenu();
    const updated = menu.map((item) =>
        item.id === id ? { ...item, ...payload } : item,
    );
    const item = updated.find((entry) => entry.id === id);
    if (!item) {
        throw new Error('Menu item not found.');
    }
    saveMenu(updated);

    return Promise.resolve(item);
};

/**
 * Deletes the menu item from local storage.
 * @param id :Id of menu item to be deleted.
 * @returns id of item deleted.
 */
export const deleteMenuItem = (id: string): Promise<string> => {
    saveMenu(getStoredMenu().filter((item) => item.id !== id));

    return Promise.resolve(id);
};

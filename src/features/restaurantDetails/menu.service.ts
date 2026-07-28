import menuMock from '../../data/menu.json';
import type { MenuItem } from '../../types';
import { readStorage, writeStorage } from '../../utils/storage';

const MENU_KEY = 'menu';

const getStoredMenu = (): MenuItem[] =>
    readStorage<MenuItem[]>(MENU_KEY, menuMock as MenuItem[]);
const saveMenu = (menu: MenuItem[]): void => {
    writeStorage(MENU_KEY, menu);
};
export const getMenu = (restaurantID?: string): Promise<MenuItem[]> => {
    const menu = getStoredMenu();
    const currentMenu = restaurantID
        ? menu.filter((item) => restaurantID === item.restaurantID)
        : menu;
    const menuData = currentMenu;

    return Promise.resolve(menuData);
};

export const addMenuItem = (
    payload: Omit<MenuItem, 'id'>,
): Promise<MenuItem> => {
    const menu = getStoredMenu();
    const item = { ...payload, id: `M${menu.length + 1}` };
    saveMenu([...menu, item]);
    return Promise.resolve(item);
};

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

export const deleteMenuItem = (id: string): Promise<string> => {
    saveMenu(getStoredMenu().filter((item) => item.id !== id));
    return Promise.resolve(id);
};

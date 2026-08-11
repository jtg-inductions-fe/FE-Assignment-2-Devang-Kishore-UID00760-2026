import menuMock from '@data/menu.json';
import type { FiltersData, MenuItem } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

const MENU_KEY = 'menu';

const getStoredMenu = (): MenuItem[] =>
    readStorage<MenuItem[]>(MENU_KEY, menuMock as MenuItem[]);
const saveMenu = (menu: MenuItem[]): void => {
    writeStorage(MENU_KEY, menu);
};
export const getMenu = (payload: {
    restaurantId?: string;
    filters?: FiltersData;
}): Promise<MenuItem[]> => {
    const restaurantID = payload.restaurantId;
    const filters = payload.filters;
    const menu = getStoredMenu();
    const currentMenu = restaurantID
        ? menu.filter((item) => restaurantID === item.restaurantID)
        : menu;
    let menuData = currentMenu;
    if (filters?.search) {
        const search = filters.search.toLowerCase();
        menuData = menuData.filter((menuItem) =>
            menuItem.name.toLowerCase().includes(search),
        );
    }
    if (filters?.type && filters.type !== 'both') {
        menuData = menuData.filter(
            (menuItem) => menuItem.category === filters.type,
        );
    }

    menuData = menuData.sort((a: MenuItem, b: MenuItem) => {
        if (a.stock === 0 && b.stock > 0) {
            return 1;
        }
        if (a.stock > 0 && b.stock === 0) {
            return -1;
        }
        return 0;
    });
    return Promise.resolve(menuData);
};

export const addMenuItem = (
    payload: Omit<MenuItem, 'id'>,
): Promise<MenuItem> => {
    const menu = getStoredMenu();
    const item = { ...payload, id: `M${Date.now()}` };
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

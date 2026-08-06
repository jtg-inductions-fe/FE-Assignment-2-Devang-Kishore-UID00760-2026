export const readStorage = <T>(key: string, fallback: T): T => {
    try {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : fallback;
    } catch {
        return fallback;
    }
};

export const writeStorage = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorage = (key: string): void => {
    localStorage.removeItem(key);
};

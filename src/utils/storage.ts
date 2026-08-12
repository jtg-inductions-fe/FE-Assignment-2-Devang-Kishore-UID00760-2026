/**
 * Reads data from the local storage for a particular key and return fallback data if data is not found in local storage.
 * @param key :key for the data to be read.
 * @param fallback :fallback data.
 * @returns return the data fetched from the local storage.
 */
export function readStorage<T>(key: string, fallback: T): T {
    try {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : fallback;
    } catch {
        return fallback;
    }
}

/**
 * Stores data in local storage .
 * @param key :key for the data to be stored.
 * @param value :value to be stored in the local storage.
 */
export function writeStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Removes data from local storage.
 * @param key :key for the data to be removed.
 */
export function removeStorage(key: string): void {
    localStorage.removeItem(key);
}

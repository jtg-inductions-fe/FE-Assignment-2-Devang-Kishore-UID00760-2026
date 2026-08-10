import usersMock from '@data/users.json';
import { User, UserData } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

const USERS_KEY = 'users';
const CURRENT_USER = 'crt_user';

/**
 * Fetches data from local storage.
 * @returns users Data fetched from local storage.
 */
const getUsers = (): User[] =>
    readStorage<User[]>(USERS_KEY, usersMock as User[]);

/**
 * Stores user data in local storage
 * @param users :Data of user to be stored in local storage.
 */
const saveUsers = (users: User[]): void => {
    writeStorage(USERS_KEY, users);
};

/**
 * Checks user exists in local storage or not and also verifies user credentials.
 * @param email :email of user.
 * @param password :password of user.
 * @returns
 */
export const login = (email: string, password: string): Promise<User> => {
    const users = getUsers();
    const user = users.find(
        (currentUser: User) =>
            currentUser.email === email && currentUser.password === password,
    );

    if (!user) {
        throw new Error('User not found');
    }

    writeStorage(CURRENT_USER, user);

    return Promise.resolve(user);
};

/**
 * checks whether another user exists with same email or not and stores the user in local storage .
 * @param props :user data
 * @returns data of user which is added in local storage
 */
export const signUp = ({
    name,
    email,
    password,
    role,
}: UserData): Promise<User> => {
    const users = getUsers();
    const emailExists = users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (emailExists) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: `U${users.length + 1}`,
        name: name,
        email: email,
        password: password,
        role: role,
    };

    users.push(newUser);
    saveUsers(users);
    writeStorage(CURRENT_USER, newUser);
    return Promise.resolve(newUser);
};

/**
 * Fetched the data of currently stored user.
 * @returns Data of user which is currently logged in.
 */
export const getCurrentUser = (): User | null =>
    readStorage<User | null>(CURRENT_USER, null);

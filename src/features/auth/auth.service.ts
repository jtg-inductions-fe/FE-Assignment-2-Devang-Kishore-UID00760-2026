import usersMock from '../../data/user.json';
import { Role, User } from '../../types/index';
import { readStorage, writeStorage } from '../../utils/storage';

type UserData = {
    name: string;
    email: string;
    password: string;
    role: Role;
};

const USERS_KEY = 'users';
const CURRENT_USER = 'crt_user';
const getUsers = (): User[] =>
    readStorage<User[]>(USERS_KEY, usersMock as User[]);
const saveUsers = (users: User[]): void => {
    writeStorage(USERS_KEY, users);
};

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

export const getCurrentUser = (): User | null =>
    readStorage<User | null>(CURRENT_USER, null);

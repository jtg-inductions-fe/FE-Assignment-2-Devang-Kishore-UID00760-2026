import { getCurrentUser } from '@services/auth.service';
import { setUser } from '@store/slices/auth/authSlice';

import { useAppDispatch, useAppSelector } from './storeHooks';

export const useAuth = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    if (user) return user;

    dispatch(setUser(getCurrentUser()));

    return user;
};

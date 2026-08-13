import { getCurrentUser } from '@services/auth.service';
import { setUser } from '@store/slices/auth/authSlice';

import { useAppDispatch, useAppSelector } from './storeHooks';
import { UseAuthReturn } from './useAuth.type';

export const useAuth = (): UseAuthReturn => {
    const { user, isLoggedIn, error, loading } = useAppSelector(
        (state) => state.auth,
    );
    const dispatch = useAppDispatch();
    if (user) return { user, isLoggedIn, error, loading };

    dispatch(setUser(getCurrentUser()));

    return { user, isLoggedIn, error, loading };
};

import { useEffect } from 'react';

import { fetchCurrentUser } from '@store/slices/auth/authSlice';

import { useAppDispatch, useAppSelector } from './storeHooks';
import { UseAuthReturn } from './useAuth.type';

export const useAuth = (): UseAuthReturn => {
    const { user, isLoggedIn, error, loading } = useAppSelector(
        (state) => state.auth,
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!user) {
            void dispatch(fetchCurrentUser());
        }
    }, [user, dispatch]);

    return { user, isLoggedIn, error, loading };
};

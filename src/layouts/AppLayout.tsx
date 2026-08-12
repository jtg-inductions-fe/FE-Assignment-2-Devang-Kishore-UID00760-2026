import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAppDispatch } from '@hooks/storeHooks';
import { getCurrentUser } from '@services/auth.service';
import { setUser } from '@store/slices/auth/authSlice';

export const AppLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUser(getCurrentUser()));
    });

    return (
        <main>
            <Outlet />
        </main>
    );
};

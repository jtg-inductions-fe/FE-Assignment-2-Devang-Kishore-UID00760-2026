import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { ROUTES } from '@constants';
import { Header } from '@layouts/header/Header';

export const AppLayout = () => {
    const location = useLocation();

    const currentLocation = location.pathname;
    const SHOW_HEADER =
        currentLocation !== ROUTES.LOGIN && currentLocation !== ROUTES.SIGNUP;

    return (
        <main>
            {SHOW_HEADER && <Header />}
            <Box maxWidth={2000} margin="auto">
                <Outlet />
            </Box>
        </main>
    );
};

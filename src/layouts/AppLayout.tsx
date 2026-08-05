import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

export const AppLayout = () => (
    <main>
        <Box maxWidth={2000} margin="auto">
            <Outlet />
        </Box>
    </main>
);

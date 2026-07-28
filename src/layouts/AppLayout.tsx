import { Outlet } from 'react-router-dom';

import { Typography } from '@mui/material';

export const AppLayout = () => (
    <>
        <Outlet />
        <Typography variant="h1">Footer</Typography>
    </>
);

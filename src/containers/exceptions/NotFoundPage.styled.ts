import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';

export const MainBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
}));

export const ComponentGrid = styled(Grid)(() => ({
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
}));

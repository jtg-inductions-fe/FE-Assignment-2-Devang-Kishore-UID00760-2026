import { Box, styled } from '@mui/material';

export const OrderContainer = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: spacing(10),
        alignItems: 'start',
        padding: spacing(8, 0),
        [breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
        },
        [breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
        },
    }),
);

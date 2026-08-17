import { Box, styled } from '@mui/material';

export const CartContentContainer = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: spacing(3),
        gap: spacing(2),
        [breakpoints.up('sm')]: {
            gap: spacing(5),
        },
    }),
);

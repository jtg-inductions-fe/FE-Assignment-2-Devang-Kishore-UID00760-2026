import { styled } from '@mui/material';

export const LogoImage = styled('img')(({ theme: { breakpoints } }) => ({
    width: 100,

    [breakpoints.up('md')]: {
        width: 180,
    },
}));

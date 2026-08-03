import { styled } from '@mui/material';

export const LogoImage = styled('img')(({ theme }) => ({
    width: theme.spacing(40),

    [theme.breakpoints.up('md')]: {
        width: theme.spacing(60),
    },
}));

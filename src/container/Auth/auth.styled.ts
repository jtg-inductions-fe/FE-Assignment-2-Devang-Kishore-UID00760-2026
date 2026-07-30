import { Link } from 'react-router-dom';

import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import backgroundDesktop from '@assets/images/auth_image_desktop.webp';
import backgroundMobile from '@assets/images/auth_image_mobile.webp';

export const AuthWrapper = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    background: `linear-gradient(rgba(250,250, 248, 0.9), rgba(250,250, 248, 0.9)),url(${backgroundMobile}) bottom left/100% auto no-repeat`,

    [theme.breakpoints.up('md')]: {
        backgroundImage: `linear-gradient(rgba(250,250, 248, 0.9), rgba(250,250, 248, 0.9)),url(${backgroundDesktop})`,
        backgroundSize: '100% 100%',
    },
}));

export const AuthHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

export const AuthLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeightBold,
}));

export const AuthContent = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
    },
}));

export const AuthCard = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),
    width: '100%',
    maxWidth: 480,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(5),
    backgroundColor: 'transparent',
    boxShadow: 'none',

    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(5),
    },
}));

export const LogoImage = styled('img')(({ theme }) => ({
    width: theme.spacing(40),

    [theme.breakpoints.up('md')]: {
        width: theme.spacing(60),
    },
}));

export const AuthForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
        gap: theme.spacing(8),
    },
}));

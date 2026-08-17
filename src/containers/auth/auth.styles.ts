import { Link } from 'react-router-dom';

import { Box, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import backgroundDesktop from '@assets/images/auth-image-desktop.webp';
import backgroundMobile from '@assets/images/auth-image-mobile.webp';
import { BORDER_RADIUS } from '@constants';
const backgroundGradient =
    'linear-gradient(rgba(250,250, 248, 0.9), rgba(250,250, 248, 0.9))';
export const AuthWrapper = styled(Box)(
    ({ theme: { palette, breakpoints } }) => ({
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: palette.background.default,
        background: `${backgroundGradient},url(${backgroundMobile}) bottom left/100% auto no-repeat`,

        [breakpoints.up('md')]: {
            backgroundImage: `${backgroundGradient},url(${backgroundDesktop})`,
            backgroundSize: '100% 100%',
        },
    }),
);

export const AuthHeader = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(3),
}));

export const AuthLink = styled(Link)(({ theme: { palette, typography } }) => ({
    color: palette.secondary.main,
    textDecoration: 'none',
    fontWeight: typography.fontWeightBold,
}));

export const AuthContent = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing(3),

        [breakpoints.up('md')]: {
            padding: spacing(6),
        },
    }),
);

export const AuthCard = styled(Paper)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(8),
        width: '100%',
        maxWidth: 480,
        padding: spacing(3),
        borderRadius: BORDER_RADIUS.SM,
        backgroundColor: 'transparent',
        boxShadow: 'none',

        [breakpoints.up('md')]: {
            padding: spacing(5),
        },
    }),
);

export const LogoImage = styled('img')(({ theme: { breakpoints } }) => ({
    width: 100,

    [breakpoints.up('md')]: {
        width: 180,
    },
}));

export const AuthForm = styled('form')(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(4),

        [breakpoints.up('md')]: {
            gap: spacing(8),
        },
    }),
);

export const AuthFooter = styled(Stack)(({ theme: { spacing } }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing(0.5),
}));

import { Box } from '@mui/material';
import { styled } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(8),
    borderBottom: '',
}));

export const HeaderTop = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

export const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export const HeaderActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
        gap: theme.spacing(6),
    },
}));

export const HeaderBottom = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: theme.spacing(4),
}));

export const HeaderSearchContainer = styled(Box)({
    display: 'flex',
    minWidth: 0,
    flex: 1,
    alignItems: 'center',
});

export const MobileHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

export const DesktopHeader = styled(Box)(({ theme }) => ({
    display: 'none',

    [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItem: 'center',
        gap: theme.spacing(5),
        width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
        gap: theme.spacing(10),
    },
}));

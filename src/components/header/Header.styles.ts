import { Box } from '@mui/material';
import { styled } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2),
    padding: spacing(8),
    borderBottom: '',
}));

export const HeaderTop = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing(2),
}));

export const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export const HeaderActions = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: spacing(5),
        [breakpoints.up('md')]: {
            gap: spacing(6),
        },
    }),
);

export const HeaderBottom = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: spacing(4),
}));

export const HeaderSearchContainer = styled(Box)({
    display: 'flex',
    minWidth: 0,
    flex: 1,
    alignItems: 'center',
});

export const MobileHeader = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(2),

        [breakpoints.up('md')]: {
            display: 'none',
        },
    }),
);

export const DesktopHeader = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'none',

        [breakpoints.up('md')]: {
            display: 'flex',
            alignItem: 'center',
            gap: spacing(5),
            width: '100%',
        },
        [breakpoints.up('lg')]: {
            gap: spacing(10),
        },
    }),
);

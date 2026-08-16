import { Box } from '@mui/material';
import { styled } from '@mui/material';
import {
    ToggleButton,
    ToggleButtonGroup,
    toggleButtonGroupClasses,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { BORDER_RADIUS } from '@constants';

export const HeaderBox = styled(Grid)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'grid',
        gridTemplateColumns: `1fr auto`,
        gridTemplateRow: 'auto auto',
        gap: spacing(4),
        padding: spacing(8),
        [breakpoints.up('lg')]: {
            gridTemplateColumns: `auto 1fr auto `,
        },
    }),
);

export const LogoContainer = styled(Box)(({ theme: { breakpoints } }) => ({
    display: 'flex',
    alignItems: 'center',
    gridROW: '1',
    gridColumn: '1',
    [breakpoints.up('lg')]: {
        gridRow: 'auto',
        gridColumn: 'auto',
    },
}));

export const HeaderActions = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: spacing(5),
        gridRow: '1',
        gridColumn: '2',
        [breakpoints.up('lg')]: {
            gap: spacing(6),
            gridRow: 'auto',
            gridColumn: 'auto',
        },
    }),
);

export const HeaderFilters = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        minWidth: 0,
        gap: spacing(8),
        gridROW: '2',
        gridColumn: '1 / -1',
        flexDirection: 'column',

        [breakpoints.up('lg')]: {
            gridRow: 'auto',
            gridColumn: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
        },
    }),
);

export const FoodTypeSwitch = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export const SwitchButtonGroup = styled(ToggleButtonGroup)(
    ({ theme: { spacing, shadows } }) => ({
        padding: spacing(0.5),
        borderRadius: BORDER_RADIUS.ROUNDED,
        boxShadow: shadows[1],
        [`& .${toggleButtonGroupClasses.grouped}`]: {
            margin: spacing(0.5),
            border: 0,
            borderRadius: BORDER_RADIUS.ROUNDED,
            [`&.${toggleButtonGroupClasses.disabled}`]: {
                border: 0,
            },
        },
        [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
            {
                marginLeft: -1,
                borderLeft: '1px solid transparent',
            },
    }),
);

export const SwitchButton = styled(ToggleButton)(
    ({ theme: { spacing, palette, breakpoints }, color }) => ({
        minWidth: 10,
        padding: `${spacing(3)} ${spacing(3)}`,
        borderRadius: BORDER_RADIUS.ROUNDED,
        color: palette.text.primary,

        '&.Mui-selected': {
            background:
                color === 'primary'
                    ? palette.primary.main
                    : color === 'secondary'
                      ? palette.secondary.main
                      : palette.error.light,
            color:
                color === 'primary'
                    ? palette.common.black
                    : palette.common.white,

            '&:hover': {
                background: palette.grey[200],
                color: palette.common.black,
            },
        },
        [breakpoints.up('lg')]: {
            minWidth: 88,
        },
    }),
);

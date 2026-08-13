import { styled } from '@mui/material';
import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    toggleButtonGroupClasses,
} from '@mui/material';
export const MultiToggleContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
    ({ theme: { spacing, shadows } }) => ({
        padding: spacing(0.5),
        borderRadius: spacing(30),
        boxShadow: shadows[1],
        [`& .${toggleButtonGroupClasses.grouped}`]: {
            margin: spacing(0.5),
            border: 0,
            borderRadius: spacing(30),
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

export const StyledToggleButton = styled(ToggleButton)(
    ({ theme: { spacing, palette, breakpoints }, color }) => ({
        minWidth: 10,
        padding: `${spacing(3)} ${spacing(3)}`,
        borderRadius: spacing(30),
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

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
    ({ theme }) => ({
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(30),
        boxShadow: theme.shadows[1],
        [`& .${toggleButtonGroupClasses.grouped}`]: {
            margin: theme.spacing(0.5),
            border: 0,
            borderRadius: theme.spacing(30),
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

export const StyledToggleButton = styled(ToggleButton)(({ theme, color }) => ({
    minWidth: 10,
    padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
    borderRadius: theme.spacing(30),
    color: theme.palette.text.primary,

    '&.Mui-selected': {
        background:
            color === 'primary'
                ? theme.palette.primary.main
                : color === 'secondary'
                  ? theme.palette.secondary.main
                  : theme.palette.error.light,
        color:
            color === 'primary'
                ? theme.palette.common.black
                : theme.palette.common.white,

        '&:hover': {
            background: theme.palette.grey[200],
            color: theme.palette.common.black,
        },
    },
    [theme.breakpoints.up('lg')]: {
        minWidth: 88,
    },
}));

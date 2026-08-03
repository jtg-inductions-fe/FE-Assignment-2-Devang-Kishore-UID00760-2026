import { FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material';

export const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase .Mui-checked': {
        color: theme.palette.success.main,
    },

    '& .MuiSwitch-switchBase .Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette.success.main,
    },
}));

export const StyledFormControlLabel = styled(FormControlLabel)({
    margin: 0,
});

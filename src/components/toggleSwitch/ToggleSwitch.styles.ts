import { Switch } from '@mui/material';
import { styled } from '@mui/material';

export const StyledSwitch = styled(Switch)(({ theme: { palette } }) => ({
    '& .MuiSwitch-switchBase .Mui-checked': {
        color: palette.success.main,
    },

    '& .MuiSwitch-switchBase .Mui-checked + .MuiSwitch-track': {
        backgroundColor: palette.success.main,
    },
}));

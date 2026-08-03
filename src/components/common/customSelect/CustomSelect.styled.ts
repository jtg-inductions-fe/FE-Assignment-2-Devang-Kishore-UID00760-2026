import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFormControl = styled(FormControl)({
    width: '100%',
});
export const StyledInputLabel = styled(InputLabel)({});

export const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: theme.spacing(2),
}));

export const StyledHelperText = styled(FormHelperText)({});

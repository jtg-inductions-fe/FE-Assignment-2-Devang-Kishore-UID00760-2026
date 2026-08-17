import { FormControl, InputLabel, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

import { BORDER_RADIUS } from '@constants';

export const StyledFormControl = styled(FormControl)({
    width: '100%',
});
export const StyledInputLabel = styled(InputLabel)({});

export const StyledSelect = styled(Select)({
    borderRadius: BORDER_RADIUS.SM,
});

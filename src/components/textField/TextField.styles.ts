import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import { BORDER_RADIUS } from '@constants';

export const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: BORDER_RADIUS.SM,
        height: 50,
    },
});

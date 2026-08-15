import { styled } from '@mui/material';

import { TextField } from '@components/textField';

export const StyledTimeField = styled(TextField)(
    ({ theme: { shape, spacing } }) => ({
        '& .MuiOutlinedInput-root': {
            borderRadius: shape.borderRadius,
            padding: spacing(20),
        },
    }),
);

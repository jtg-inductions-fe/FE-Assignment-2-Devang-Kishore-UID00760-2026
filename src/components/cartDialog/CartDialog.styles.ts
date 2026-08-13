import { Dialog, styled } from '@mui/material';

export const StyledCartDialog = styled(Dialog)(
    ({ theme: { breakpoints, spacing } }) => ({
        '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: breakpoints.values.md,
            borderRadius: spacing(2),
            padding: spacing(4),
        },
    }),
);

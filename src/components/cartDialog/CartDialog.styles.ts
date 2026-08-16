import { Dialog, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constants';

export const StyledCartDialog = styled(Dialog)(
    ({ theme: { breakpoints, spacing } }) => ({
        '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: breakpoints.values.md,
            borderRadius: BORDER_RADIUS.SM,
            padding: spacing(4),
        },
    }),
);

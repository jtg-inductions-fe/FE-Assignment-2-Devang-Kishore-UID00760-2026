import { Dialog, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constants';

export const CustomDialog = styled(Dialog)(
    ({ theme: { spacing, typography } }) => ({
        '& .MuiDialog-paper': {
            borderRadius: BORDER_RADIUS.SM,
            padding: spacing(4),
        },

        '& .MuiDialogActions-root': {
            padding: spacing(8),
        },

        '& .MuiDialogTitle-root': {
            fontSize: typography.h3.fontSize,
            fontWeight: typography.fontWeightBold,
        },
    }),
);

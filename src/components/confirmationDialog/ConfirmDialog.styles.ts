import { Dialog, styled } from '@mui/material';

export const CustomDialog = styled(Dialog)(
    ({ theme: { spacing, typography } }) => ({
        '& .MuiDialog-paper': {
            borderRadius: spacing(5),
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

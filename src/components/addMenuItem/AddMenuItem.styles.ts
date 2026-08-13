import { Dialog, styled } from '@mui/material';

export const CustomDialog = styled(Dialog)(
    ({ theme: { spacing, palette, typography } }) => ({
        '& .MuiDialog-paper': {
            borderRadius: spacing(5),
            padding: spacing(8),
        },

        '& .MuiDialogActions-root': {
            padding: spacing(8),
        },

        '& .MuiDialogTitle-root': {
            color: palette.secondary.main,
            fontSize: typography.h3.fontSize,
            fontWeight: typography.fontWeightBold,
        },
    }),
);

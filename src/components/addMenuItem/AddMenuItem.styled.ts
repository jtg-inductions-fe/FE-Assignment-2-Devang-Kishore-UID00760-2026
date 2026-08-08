import { Dialog, styled } from '@mui/material';

export const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(5),
        padding: theme.spacing(8),
    },

    '& .MuiDialogActions-root': {
        padding: theme.spacing(8),
    },

    '& .MuiDialogTitle-root': {
        color: theme.palette.secondary.main,
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.fontWeightBold,
    },
}));

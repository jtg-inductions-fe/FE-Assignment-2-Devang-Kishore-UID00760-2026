import { Drawer, styled } from '@mui/material';

export const StyledCartDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
        maxHeight: '90vh',
    },
}));

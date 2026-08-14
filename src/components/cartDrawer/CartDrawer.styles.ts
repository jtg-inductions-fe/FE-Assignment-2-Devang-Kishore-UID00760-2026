import { Drawer, styled } from '@mui/material';

export const StyledCartDrawer = styled(Drawer)(({ theme: { spacing } }) => ({
    '& .MuiDrawer-paper': {
        borderRadius: `${spacing(2)} ${spacing(2)} 0 0`,
        maxHeight: '90vh',
    },
}));

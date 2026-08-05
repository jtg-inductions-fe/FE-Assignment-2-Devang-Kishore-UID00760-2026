import { Menu, MenuItem, styled } from '@mui/material';
export const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1),
        minWidth: 240,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[8],
        overFlow: 'hidden',
    },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
}));

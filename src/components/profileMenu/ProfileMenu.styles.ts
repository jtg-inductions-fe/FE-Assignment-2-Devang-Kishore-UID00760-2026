import { Menu, MenuItem, styled } from '@mui/material';
export const StyledMenu = styled(Menu)(({ theme: { spacing, shadows } }) => ({
    '& .MuiPaper-root': {
        marginTop: spacing(1),
        minWidth: 240,
        padding: spacing(2),
        borderRadius: spacing(2),
        boxShadow: shadows[8],
        overFlow: 'hidden',
    },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme: { spacing } }) => ({
    padding: spacing(1.5, 2),
}));

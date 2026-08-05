import { Box, styled } from '@mui/material';

export const SearchBarContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        height: theme.spacing(13),
        borderRadius: theme.spacing(30),
        '& fieldset': {
            borderRadius: theme.spacing(30),
        },
    },
}));

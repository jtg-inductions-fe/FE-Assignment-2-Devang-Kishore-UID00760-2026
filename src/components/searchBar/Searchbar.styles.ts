import { Box, styled } from '@mui/material';

export const SearchBarContainer = styled(Box)(({ theme: { spacing } }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        height: 50,
        borderRadius: spacing(30),
        '& fieldset': {
            borderRadius: spacing(30),
        },
    },
}));

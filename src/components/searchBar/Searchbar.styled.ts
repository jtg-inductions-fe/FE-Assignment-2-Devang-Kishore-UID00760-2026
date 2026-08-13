import { Box, styled } from '@mui/material';

export const SearchBarContainer = styled(Box)(({ theme: { spacing } }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        height: spacing(13),
        borderRadius: spacing(30),
        '& fieldset': {
            borderRadius: spacing(30),
        },
    },
}));

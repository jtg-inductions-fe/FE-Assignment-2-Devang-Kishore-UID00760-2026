import { Select, styled } from '@mui/material';

export const StatusSelect = styled(Select)(({ theme }) => ({
    minWidth: 130,
    borderRadius: theme.spacing(1),
}));

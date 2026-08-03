import { IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
}));

export const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: 180,
    objectFit: 'cover',
    BorderRadius: theme.shape.borderRadius,
}));

export const RemoveButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
}));

import { IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme: { spacing, shape } }) => ({
    position: 'relative',
    padding: spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: shape.borderRadius,
}));

export const StyledImage = styled('img')(({ theme: { shape } }) => ({
    width: '100%',
    maxHeight: 180,
    objectFit: 'cover',
    BorderRadius: shape.borderRadius,
}));

export const RemoveButton = styled(IconButton)(({ theme: { spacing } }) => ({
    position: 'absolute',
    top: spacing(1),
    right: spacing(1),
}));

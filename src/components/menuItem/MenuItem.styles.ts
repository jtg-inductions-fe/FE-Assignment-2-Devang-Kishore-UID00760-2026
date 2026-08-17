import { alpha } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

export const MenuCard = styled(Grid)(
    ({ theme: { spacing, shape, palette } }) => ({
        padding: spacing(8),
        borderRadius: shape.borderRadius,
        backgroundColor: alpha(`${palette.primary.light}`, 0.1),
    }),
);

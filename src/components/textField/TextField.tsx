import type { TextFieldProps } from '@mui/material';

import { StyledTextField } from './TextField.styled';

export const TextField = ({
    fullWidth = true,
    variant = 'outlined',
    ...props
}: TextFieldProps) => (
    <StyledTextField fullWidth={fullWidth} variant={variant} {...props} />
);

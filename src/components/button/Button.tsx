import { ButtonProps } from '@mui/material';

import { StyledButton } from './Button.styles';

export const Button = ({ children, ...props }: ButtonProps) => (
    <StyledButton {...props}>{children}</StyledButton>
);

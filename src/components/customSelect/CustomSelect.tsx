import { CustomSelectProps } from '@types';

import {
    StyledFormControl,
    StyledHelperText,
    StyledInputLabel,
    StyledSelect,
} from './CustomSelect.styled';

export const CustomSelect = ({
    label,
    helperText,
    error,
    children,
    formControlProps,
    ...props
}: CustomSelectProps) => (
    <StyledFormControl error={error} {...formControlProps}>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledSelect label={label} {...props}>
            {children}
        </StyledSelect>
        <StyledHelperText>{helperText}</StyledHelperText>
    </StyledFormControl>
);

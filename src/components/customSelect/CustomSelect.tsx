import {
    StyledFormControl,
    StyledHelperText,
    StyledInputLabel,
    StyledSelect,
} from './CustomSelect.styles';
import { CustomSelectProps } from './customSelect.types';

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

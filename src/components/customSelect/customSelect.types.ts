import { FormControlProps, SelectProps } from '@mui/material';

export type CustomSelectProps = SelectProps & {
    label: string;
    helperText?: string;
    error?: boolean;
    formControlProps?: FormControlProps;
};

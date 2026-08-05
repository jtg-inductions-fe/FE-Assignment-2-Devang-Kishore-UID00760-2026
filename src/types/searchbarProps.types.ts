import { TextFieldProps } from '@mui/material';

export interface SearchbarProps extends Omit<TextFieldProps, 'value'> {
    value: string;
}

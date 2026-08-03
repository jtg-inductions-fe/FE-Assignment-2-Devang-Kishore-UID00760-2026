import { ReactNode } from 'react';

import { FormControlProps, SelectProps } from '@mui/material';

export type CustomSelectProps = SelectProps & {
    label: string;
    helperText?: ReactNode;
    error?: boolean;
    formControlProps?: FormControlProps;
};

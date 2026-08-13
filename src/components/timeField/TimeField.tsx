import { TextFieldProps } from '@mui/material';

import { TextField } from '@components/textField';

export const TimeField = (props: TextFieldProps) => (
    <TextField {...props} type="time" />
);

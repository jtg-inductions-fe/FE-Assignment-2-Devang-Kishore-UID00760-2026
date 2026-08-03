import type { TextFieldProps } from '@mui/material';

import { TextField } from '@components/common/textField';

export const TimeField = (props: TextFieldProps) => (
    <TextField {...props} type="time" />
);

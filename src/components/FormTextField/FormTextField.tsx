import { Controller, FieldValues } from 'react-hook-form';

import { TextField } from '@mui/material';

import { FormTextFieldProps } from './FormTextField.types';

export const FormTextField = <T extends FieldValues>(
    props: FormTextFieldProps<T>,
) => {
    const {
        name,
        control,
        label,
        type = 'text',
        multiline = false,
        rows,
        required = false,
        disabled=false
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    multiline={multiline}
                    rows={rows}
                    fullWidth
                    required={required}
                    disabled={disabled}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) =>
                        field.onChange(
                            type === 'number'
                                ? Number(e.target.value)
                                : e.target.value,
                        )
                    }
                />
            )}
        />
    );
};

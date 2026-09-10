import { Controller, FieldValues } from 'react-hook-form';

import { MenuItem } from '@mui/material';

import { CustomSelect } from '@components/customSelect';

import { FormSelectFieldProps } from './FormSelectFeld.types';

export const FormSelectField = <T extends FieldValues>(
    props: FormSelectFieldProps<T>,
) => {
    const { name, control, label, options, required = false ,disabled=false} = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <CustomSelect
                    {...field}
                    label={label}
                    required={required}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled={disabled}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </CustomSelect>
            )}
        />
    );
};

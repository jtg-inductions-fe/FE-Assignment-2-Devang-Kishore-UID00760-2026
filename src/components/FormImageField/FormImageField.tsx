import { Controller, FieldValues } from 'react-hook-form';

import { TextField } from '@mui/material';

import { ImagePreview } from '@components/imagePreview';

import { FormImageFieldProps } from './FormImageField.types';

export const FormImageField = <T extends FieldValues>(
    props: FormImageFieldProps<T>,
) => {
    const { name, control, label, alt } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) =>
                field.value ? (
                    <ImagePreview
                        src={field.value}
                        alt={alt}
                        onRemove={() => field.onChange('')}
                    />
                ) : (
                    <TextField
                        {...field}
                        label={label}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )
            }
        />
    );
};

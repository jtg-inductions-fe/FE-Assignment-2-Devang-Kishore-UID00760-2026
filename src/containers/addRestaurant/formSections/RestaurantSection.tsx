import { Controller, Path, useFormContext } from 'react-hook-form';

import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomSelect } from '@components/customSelect';
import { FormSelectField } from '@components/FormSelectField';
import { FormTextField } from '@components/FormTextField';
import { TextField } from '@components/textField';
import { CUISINES } from '@constants';
import { restaurantInfoFields } from '@containers/addRestaurant/addRestaurant.config';
import { addRestaurantContent } from '@containers/addRestaurant/addRestaurant.constants';
import { AddRestaurantFormData } from '@containers/addRestaurant/AddRestaurant.types';
import { useAppSelector } from '@hooks/storeHooks';

export const RestaurantSection = () => {
    const { control } = useFormContext<AddRestaurantFormData>();
    const { user } = useAppSelector((state) => state.auth);
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label={`${addRestaurantContent.OWNER_NAME_LABEL}`}
                    fullWidth
                    value={user?.name}
                    disabled
                />
            </Grid>

            {restaurantInfoFields.map((field) => {
                const fieldName = field.name as Path<AddRestaurantFormData>;
                return (
                    <Grid key={field.name} size={field.grid}>
                        {field.type === 'select' ? (
                            <FormSelectField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                options={field.options ?? []}
                            />
                        ) : (
                            <FormTextField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                type={field.type}
                                multiline={field.multiline}
                                rows={field.rows}
                                required={field.required}
                            />
                        )}
                    </Grid>
                );
            })}

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="cuisines"
                    control={control}
                    render={({ field, fieldState }) => (
                        <CustomSelect
                            {...field}
                            multiple
                            label={`${addRestaurantContent.RESTAURANT_CUISINES_LABEL}`}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            required
                            MenuProps={{
                                anchorOrigin: {
                                    horizontal: 'left',
                                    vertical: 'top',
                                },
                                transformOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                            }}
                        >
                            {CUISINES.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    )}
                />
            </Grid>
        </Grid>
    );
};

import {
    Controller,
    FieldErrors,
    FieldPath,
    FieldValues,
    get,
} from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Button } from '@components/button';
import { CustomSelect } from '@components/customSelect';
import { ImagePreview } from '@components/imagePreview';
import { TextField } from '@components/textField';
import { RestaurantMenuItemProps } from '@types';

import { MenuCard } from './RestaurantMenuItem.styled';

export const RestaurantMenuItem = <T extends FieldValues>(
    props: RestaurantMenuItemProps<T>,
) => {
    const {
        index,
        showDelete,
        control,
        cuisines,
        foodTypes,
        onDelete,
        errors,
    } = props;
    return (
        <MenuCard container spacing={3}>
            {index !== undefined && (
                <Grid size={10}>
                    {' '}
                    Menu Item {index !== undefined ? index + 1 : ''}
                </Grid>
            )}
            {showDelete && (
                <Grid size={2}>
                    <Button color="error" onClick={onDelete}>
                        <DeleteIcon />
                    </Button>
                </Grid>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={
                        (index !== undefined
                            ? `menu.[${index}].name`
                            : 'name') as FieldPath<T>
                    }
                    control={control}
                    render={({ field }) => {
                        const fieldName =
                            index !== undefined
                                ? `menu.[${index}].name`
                                : 'name';
                        const error = get(errors, fieldName) as
                            | FieldErrors
                            | undefined;
                        return (
                            <TextField
                                {...field}
                                label="Dish Name"
                                fullWidth
                                required
                                slotProps={{ inputLabel: { shrink: true } }}
                                error={!!error}
                                helperText={
                                    typeof error?.message === 'string'
                                        ? error?.message
                                        : undefined
                                }
                            />
                        );
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={
                        (index !== undefined
                            ? `menu.${index}.cuisine`
                            : 'cuisine') as FieldPath<T>
                    }
                    control={control}
                    render={({ field }) => {
                        const fieldName =
                            index !== undefined
                                ? `menu.${index}.cuisine`
                                : 'cuisine';
                        const error = get(errors, fieldName) as
                            | FieldErrors
                            | undefined;
                        return (
                            <CustomSelect
                                {...field}
                                label="Cuisine *"
                                error={!!error}
                                helperText={
                                    typeof error?.message === 'string'
                                        ? error?.message
                                        : undefined
                                }
                            >
                                {cuisines.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        );
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={
                        (index !== undefined
                            ? `menu.${index}.category`
                            : 'category') as FieldPath<T>
                    }
                    control={control}
                    render={({ field }) => {
                        const fieldName =
                            index !== undefined
                                ? `menu.${index}.category`
                                : 'category';
                        const error = get(errors, fieldName) as
                            | FieldErrors
                            | undefined;
                        return (
                            <CustomSelect
                                {...field}
                                label="Category *"
                                error={!!error}
                                helperText={
                                    typeof error?.message === 'string'
                                        ? error?.message
                                        : undefined
                                }
                            >
                                {foodTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        );
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={
                        (index !== undefined
                            ? `menu.${index}.price`
                            : 'price') as FieldPath<T>
                    }
                    control={control}
                    render={({ field }) => {
                        const fieldName =
                            index !== undefined
                                ? `menu.${index}.price`
                                : 'price';
                        const error = get(errors, fieldName) as
                            | FieldErrors
                            | undefined;
                        return (
                            <TextField
                                {...field}
                                label="Dish Price"
                                type="number"
                                fullWidth
                                required
                                error={!!error}
                                helperText={
                                    typeof error?.message === 'string'
                                        ? error?.message
                                        : undefined
                                }
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                                slotProps={{ htmlInput: { min: 0 } }}
                            />
                        );
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={
                        (index !== undefined
                            ? `menu.${index}.stock`
                            : 'stock') as FieldPath<T>
                    }
                    control={control}
                    render={({ field }) => {
                        const fieldName =
                            index !== undefined
                                ? `menu.${index}.stock`
                                : 'stock';
                        const error = get(errors, fieldName) as
                            | FieldErrors
                            | undefined;
                        return (
                            <TextField
                                {...field}
                                label="Stock"
                                type="number"
                                fullWidth
                                required
                                error={!!error}
                                helperText={
                                    typeof error?.message === 'string'
                                        ? error?.message
                                        : undefined
                                }
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                                slotProps={{ htmlInput: { min: 0 } }}
                            />
                        );
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={
                        (index !== undefined
                            ? `menu.${index}.image`
                            : 'image') as FieldPath<T>
                    }
                    control={control}
                    render={({ field }) => {
                        const fieldName =
                            index !== undefined
                                ? `menu.${index}.image`
                                : 'image';
                        const error = get(errors, fieldName) as
                            | FieldErrors
                            | undefined;
                        return field.value ? (
                            <ImagePreview
                                src={field.value}
                                alt="Dish Image"
                                onRemove={() => field.onChange('')}
                            />
                        ) : (
                            <TextField
                                {...field}
                                label="Image URL"
                                fullWidth
                                error={!!error}
                                helperText={
                                    typeof error?.message === 'string'
                                        ? error?.message
                                        : undefined
                                }
                            />
                        );
                    }}
                />
            </Grid>
            <Grid size={12}>
                <Controller
                    name={
                        (index !== undefined
                            ? `menu.${index}.description`
                            : 'description') as FieldPath<T>
                    }
                    control={control}
                    render={({ field }) => {
                        const fieldName =
                            index !== undefined
                                ? `menu.${index}.description`
                                : 'description';
                        const error = get(errors, fieldName) as
                            | FieldErrors
                            | undefined;
                        return (
                            <TextField
                                {...field}
                                label="Description"
                                multiline
                                rows={4}
                                fullWidth
                                error={!!error}
                                helperText={
                                    typeof error?.message === 'string'
                                        ? error?.message
                                        : undefined
                                }
                            />
                        );
                    }}
                />
            </Grid>
        </MenuCard>
    );
};

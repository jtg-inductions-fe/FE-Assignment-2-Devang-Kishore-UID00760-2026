import { useState } from 'react';

import { Path, useFieldArray, useFormContext } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';

import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog';
import { FormImageField } from '@components/FormImageField';
import { FormSelectField } from '@components/FormSelectField';
import { FormTextField } from '@components/FormTextField';
import { menuFields } from '@containers/addRestaurant/addRestaurant.config';
import { addRestaurantContent } from '@containers/addRestaurant/addRestaurant.constants';
import { MenuCard } from '@containers/addRestaurant/AddRestaurant.styles';
import { AddRestaurantFormData } from '@containers/addRestaurant/AddRestaurant.types';
import { Cuisine, FoodType } from '@types';

export const MenuSection = () => {
    const { control } = useFormContext<AddRestaurantFormData>();
    const { fields, append, remove } = useFieldArray({ control, name: 'menu' });
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const addMenuItem = () => {
        append({
            name: '',
            description: '',
            cuisine: Cuisine.INDIAN,
            category: FoodType.VEG,
            price: 0,
            stock: 0,
            image: '',
        });
    };

    const handleRemove = (index: number) => {
        setDeleteIndex(index);
        setIsOpen((state) => !state);
    };

    return (
        <Grid container spacing={3}>
            {fields.map((item, index) => (
                <MenuCard container spacing={3} key={item.id}>
                    <Grid size={10}>
                        {' '}
                        {addRestaurantContent.MENU_ITEMS_TITLE} {index + 1}
                    </Grid>
                    <Grid size={2}>
                        <Button
                            color="error"
                            disabled={fields.length == 1}
                            onClick={() => handleRemove(index)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Grid>
                    {menuFields.map((field) => {
                        const fieldName =
                            `menu.${index}.${field.name}` as Path<AddRestaurantFormData>;
                        return (
                            <Grid key={field.name} size={field.grid}>
                                {field.type === 'select' ? (
                                    <FormSelectField
                                        name={fieldName}
                                        control={control}
                                        label={field.label}
                                        options={field.options ?? []}
                                    />
                                ) : field.type === 'image' ? (
                                    <FormImageField
                                        name={fieldName}
                                        control={control}
                                        label={field.label}
                                        alt={
                                            addRestaurantContent.DISH_IMAGE_ALT
                                        }
                                    />
                                ) : (
                                    <FormTextField
                                        name={fieldName}
                                        control={control}
                                        label={field.label}
                                        type={field.type}
                                        multiline={field.multiline}
                                        rows={field.rows}
                                        required
                                    />
                                )}
                            </Grid>
                        );
                    })}
                </MenuCard>
            ))}
            <Button variant="outlined" onClick={addMenuItem}>
                {addRestaurantContent.ADD_MENU_BUTTON}
            </Button>
            <ConfirmDialog
                open={isOpen}
                title={`${addRestaurantContent.MENU_DIALOG_TITLE}`}
                message={`${addRestaurantContent.MENU_DIALOG_SUBTITLE}`}
                confirmLabel={`${addRestaurantContent.DELETE_ITEM_CONFIRM_LABEL}`}
                onCancel={() => setIsOpen((state) => !state)}
                onConfirm={() => {
                    remove(deleteIndex);
                    setIsOpen((state) => !state);
                }}
            />
        </Grid>
    );
};

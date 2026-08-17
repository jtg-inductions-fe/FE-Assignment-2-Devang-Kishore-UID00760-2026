import { FieldValues, Path } from 'react-hook-form';

import { Delete } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

import { Button } from '@components/button';
import { FormImageField } from '@components/FormImageField';
import { FormSelectField } from '@components/FormSelectField';
import { FormTextField } from '@components/FormTextField';
import { inputFieldTypes } from '@constants';
import { RestaurantMenuItemProps } from '@types';

import { menuFields, menuItemContent } from './menuItem.constants';
import { MenuCard } from './MenuItem.styles';

export const MenuItem = <T extends FieldValues>(
    props: RestaurantMenuItemProps<T>,
) => {
    const { index, showDelete, control, onDelete } = props;
    return (
        <MenuCard container spacing={3}>
            {index !== undefined && (
                <Grid size={10}>
                    {' '}
                    {menuItemContent.MENU_FORM_HEADING}{' '}
                    {index !== undefined ? index + 1 : ''}
                </Grid>
            )}
            {showDelete && (
                <Grid size={2}>
                    <Button color="error" onClick={onDelete}>
                        <Delete />
                    </Button>
                </Grid>
            )}
            {menuFields.map((field) => {
                const fieldName = field.name as Path<T>;
                return (
                    <Grid key={field.name} size={field.grid}>
                        {field.type === inputFieldTypes.SELECT ? (
                            <FormSelectField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                options={field.options ?? []}
                            />
                        ) : field.type === inputFieldTypes.IMAGE ? (
                            <FormImageField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                alt={menuItemContent.DISH_IMAGE_ALT}
                            />
                        ) : (
                            <FormTextField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                type={field.type}
                                multiline={field.multiline}
                                rows={field.rows}
                            />
                        )}
                    </Grid>
                );
            })}
        </MenuCard>
    );
};

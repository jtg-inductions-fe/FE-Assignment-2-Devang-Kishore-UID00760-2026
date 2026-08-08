import { Form } from 'react-router-dom';

import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Button } from '@components/button';
import { RestaurantMenuItem } from '@components/restaurantMenuItem/RestaurantMenuItem';
import { MenuFormContainer } from '@types';

import { CustomDialog } from './AddMenuItem.styled';
export const AddMenuItem = (props: MenuFormContainer) => {
    const {
        open,
        handleClose,
        handleSubmitForm,
        control,
        cuisines,
        foodTypes,
        errors,
    } = props;
    return (
        <CustomDialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
            disableRestoreFocus
        >
            <DialogTitle id="alert-dialog-title">
                {'Add New Menu Item'}
            </DialogTitle>
            <Form onSubmit={handleSubmitForm}>
                <DialogContent>
                    <RestaurantMenuItem
                        showDelete={false}
                        control={control}
                        cuisines={cuisines}
                        foodTypes={foodTypes}
                        errors={errors}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Form>
        </CustomDialog>
    );
};

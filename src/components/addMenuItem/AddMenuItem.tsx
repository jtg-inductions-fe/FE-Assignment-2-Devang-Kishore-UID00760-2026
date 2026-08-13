import { Form } from 'react-router-dom';

import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Button } from '@components/button';
import { RestaurantMenuItem } from '@components/restaurantMenuItem/RestaurantMenuItem';
import { ACTION_BUTTONS } from '@constants';
import { MenuFormContainer } from '@types';

import { menuContent } from './addMenuItem.constants';
import { CustomDialog } from './AddMenuItem.styles';
export const AddMenuItem = (props: MenuFormContainer) => {
    const { open, handleClose, handleSubmitForm, control, isEditMode } = props;
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
                {isEditMode ? menuContent.EDIT_TITLE : menuContent.ADD_TITLE}
            </DialogTitle>
            <Form onSubmit={handleSubmitForm}>
                <DialogContent>
                    <RestaurantMenuItem showDelete={false} control={control} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="error"
                    >
                        {ACTION_BUTTONS.CANCEL}
                    </Button>
                    <Button type="submit" variant="contained" color="secondary">
                        {ACTION_BUTTONS.SUBMIT}
                    </Button>
                </DialogActions>
            </Form>
        </CustomDialog>
    );
};

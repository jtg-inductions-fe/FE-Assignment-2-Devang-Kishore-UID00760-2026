import { Form } from 'react-router-dom';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

import { Button } from '@components/button';
import { MenuItem } from '@components/menuItem/MenuItem';
import { actionLabels } from '@constants';
import { MenuFormContainer } from '@types';

import { menuContent } from './addEditMenuItem.constants';

export const AddEditMenuItem = (props: MenuFormContainer) => {
    const { open, handleClose, handleSubmitForm, control, isEditMode } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
            disableRestoreFocus
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: (theme) => theme.spacing(5),
                        padding: (theme) => theme.spacing(8),
                    },
                },
            }}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    color: (theme) => theme.palette.secondary.main,
                    fontSize: (theme) => theme.typography.h3.fontSize,
                    fontWeight: (theme) => theme.typography.fontWeightBold,
                }}
            >
                {isEditMode ? menuContent.EDIT_TITLE : menuContent.ADD_TITLE}
            </DialogTitle>
            <Form onSubmit={handleSubmitForm}>
                <DialogContent>
                    <MenuItem showDelete={false} control={control} />
                </DialogContent>
                <DialogActions
                    sx={{
                        padding: (theme) => theme.spacing(8),
                    }}
                >
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="error"
                    >
                        {actionLabels.CANCEL}
                    </Button>
                    <Button type="submit" variant="contained" color="secondary">
                        {actionLabels.SUBMIT}
                    </Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
};

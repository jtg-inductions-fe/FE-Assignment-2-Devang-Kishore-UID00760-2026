import { Alert, Snackbar } from '@mui/material';

import { FeedbackComponentType } from '@types';

import { SNACKBAR_OPEN_TIME } from './feedback.constants';
/**
 * FeedBackComponent.
 * @param props Data to be shown in snackbar.
 * @returns Snackbar component.
 */
export const FeedbackComponent = (props: FeedbackComponentType) => {
    const { snackbarOpen, snackbarSeverity, snackbarClose, snackbarMessage } =
        props;

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={SNACKBAR_OPEN_TIME}
                onClose={snackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant="filled"
                    onClose={snackbarClose}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

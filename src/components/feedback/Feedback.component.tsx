import { Alert, Snackbar } from '@mui/material';

import type { FeedbackComponentType } from '@types';

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
                autoHideDuration={3500}
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

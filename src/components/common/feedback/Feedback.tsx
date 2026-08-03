import { Alert, Snackbar } from '@mui/material';

import type { FeedbackComponentType } from '@types';
export const FeedbackComponent = ({
    snackbarOpen,
    snackbarSeverity,
    snackbarClose,
    snackbarMessage,
}: FeedbackComponentType) => (
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

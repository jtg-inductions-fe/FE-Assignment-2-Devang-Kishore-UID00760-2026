import type { PropsWithChildren } from 'react';

import { Alert, Snackbar } from '@mui/material';

import { hideSnackbar } from './snackbarSlice';
import { UseAppDispatch, UseAppSelector } from '../../../hooks/storeHooks';
export const SnackbarProvider = ({ children }: PropsWithChildren) => {
    const dispatch = UseAppDispatch();
    const snackbar = UseAppSelector((state) => state.snackbar);
    return (
        <>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={() => dispatch(hideSnackbar())}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() => dispatch(hideSnackbar())}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

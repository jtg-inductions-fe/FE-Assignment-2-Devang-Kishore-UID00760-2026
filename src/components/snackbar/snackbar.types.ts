import type { Snackbar } from '../../types';
export interface SnackbarState {
    open: boolean;
    message: string;
    severity: Snackbar;
}

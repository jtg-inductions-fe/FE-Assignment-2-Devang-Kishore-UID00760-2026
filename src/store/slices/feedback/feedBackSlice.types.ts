import { SnackbarTheme } from '@types';

export interface FeedBackState {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: SnackbarTheme;
}

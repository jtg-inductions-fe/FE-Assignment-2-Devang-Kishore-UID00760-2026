import type { SnackbarTheme } from '@types';

export interface FeedBackState {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: SnackbarTheme;
}

export interface FeedbackComponentType {
    snackbarOpen: boolean;
    snackbarSeverity: SnackbarTheme;
    snackbarMessage: string;
    snackbarClose: () => void;
}

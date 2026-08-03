import type { Snackbar } from '@types';

export interface FeedBackState {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: Snackbar;
}

export interface FeedbackComponentType {
    snackbarOpen: boolean;
    snackbarSeverity: Snackbar;
    snackbarMessage: string;
    snackbarClose: () => void;
}

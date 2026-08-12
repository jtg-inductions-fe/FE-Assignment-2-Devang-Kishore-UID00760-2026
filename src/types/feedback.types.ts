import { SnackbarTheme } from '@types';

export interface FeedbackComponentType {
    snackbarOpen: boolean;
    snackbarSeverity: SnackbarTheme;
    snackbarMessage: string;
    snackbarClose: () => void;
}

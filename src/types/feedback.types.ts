export enum SnackbarTheme {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}
export interface FeedbackComponentType {
    snackbarOpen: boolean;
    snackbarSeverity: SnackbarTheme;
    snackbarMessage: string;
    snackbarClose: () => void;
}

import { FeedbackComponent } from '@components/feedback';

/**
 * FeedBack provider.
 * @returns Feedback provider.
 */
export const FeedbackProvider = () => (
    <FeedbackComponent
        snackbarOpen={false}
        snackbarSeverity="success"
        snackbarClose={() => {}}
        snackbarMessage={'snackbar'}
    />
);

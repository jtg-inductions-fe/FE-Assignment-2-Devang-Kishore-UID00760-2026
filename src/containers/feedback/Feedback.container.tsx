import { FeedbackComponent } from '@components/feedback';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { hideSnackbar } from '@store/slices/feedback/feedBackSlice';

/**
 * FeedBack provider.
 * @returns Feedback provider.
 */
export const Feedback = () => {
    const dispatch = useAppDispatch();
    const feedback = useAppSelector((state) => state.feedback);

    return (
        <FeedbackComponent
            snackbarOpen={feedback.snackbarOpen}
            snackbarSeverity={feedback.snackbarSeverity}
            snackbarClose={() => {
                dispatch(hideSnackbar());
            }}
            snackbarMessage={feedback.snackbarMessage}
        />
    );
};

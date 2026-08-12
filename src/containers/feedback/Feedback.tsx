import { FeedbackComponent } from '@components/feedback';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { hideSnackbar } from '@store/slices/feedback/feedBackSlice';

export const FeedbackProvider = () => {
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

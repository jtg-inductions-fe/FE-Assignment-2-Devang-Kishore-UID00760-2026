import { FeedbackComponent } from '@components/common/feedback/Feedback';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { hideSnackbar } from '@store/slices/feedBackSlice';

export const FeedbackProvider = () => {
    const dispatch = UseAppDispatch();
    const feedback = UseAppSelector((state) => state.feedback);

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

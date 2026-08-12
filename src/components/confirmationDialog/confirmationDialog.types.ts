export interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

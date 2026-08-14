import { Stack, styled } from '@mui/material';

export const CartSummaryContainer = styled(Stack)(({ theme: { spacing } }) => ({
    gap: spacing(1.5),
}));

export const SummaryRow = styled(Stack)({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const TotalRow = styled(SummaryRow)(({ theme: { spacing } }) => ({
    marginTop: spacing(1),
}));

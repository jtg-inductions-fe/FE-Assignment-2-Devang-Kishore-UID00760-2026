import { Drawer, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constants';

export const StyledCartDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        borderRadius: `${BORDER_RADIUS.SM} ${BORDER_RADIUS.SM} 0 0`,
        maxHeight: '90vh',
    },
});

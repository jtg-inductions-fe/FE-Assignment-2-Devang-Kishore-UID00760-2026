import type { ReactNode } from 'react';

import type { IconButtonProps } from '@mui/material';
export interface BadgeIconButtonProps extends IconButtonProps {
    icon: ReactNode;
    badgeContent?: number;
}

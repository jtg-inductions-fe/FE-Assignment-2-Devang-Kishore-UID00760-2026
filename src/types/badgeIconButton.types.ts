import { ReactNode } from 'react';

import { IconButtonProps } from '@mui/material';
export interface BadgeIconButtonProps extends IconButtonProps {
    icon: ReactNode;
    badgeContent?: number;
}

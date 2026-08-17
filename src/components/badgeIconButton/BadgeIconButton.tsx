import { Badge } from '@mui/material';
import { IconButton } from '@mui/material';

import { BadgeIconButtonProps } from './badgeIconButton.types';

export const BadgeIconButton = ({
    icon,
    badgeContent = 0,
    ...props
}: BadgeIconButtonProps) => (
    <Badge badgeContent={badgeContent} color="error" invisible={!badgeContent}>
        <IconButton {...props}>{icon}</IconButton>
    </Badge>
);

import { Badge } from '@mui/material';
import { IconButton } from '@mui/material';

import { BadgeIconButtonProps } from '@types';

import { BadgeIconButtonContainer } from './BadgeIconButton.styles';

export const BadgeIconButton = ({
    icon,
    badgeContent = 0,
    ...props
}: BadgeIconButtonProps) => (
    <BadgeIconButtonContainer>
        <Badge
            badgeContent={badgeContent}
            color="error"
            invisible={badgeContent === 0}
        >
            <IconButton {...props}>{icon}</IconButton>
        </Badge>
    </BadgeIconButtonContainer>
);

import { useState } from 'react';

import { LogoutOutlined } from '@mui/icons-material';
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Typography,
} from '@mui/material';

import { ProfileMenuProps } from '@types';

import { StyledMenu, StyledMenuItem } from './ProfileMenu.styled';

export const ProfileMenu = ({ name, onLogout }: ProfileMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                aria-label="open account menu"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <StyledMenu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Typography variant="body1" color="primary">
                    {name}
                </Typography>
                <Divider />
                <StyledMenuItem
                    onClick={() => {
                        handleClose();
                        onLogout();
                    }}
                >
                    <ListItemIcon>
                        <LogoutOutlined fontSize="small" />
                    </ListItemIcon>
                    Logout
                </StyledMenuItem>
            </StyledMenu>
        </>
    );
};

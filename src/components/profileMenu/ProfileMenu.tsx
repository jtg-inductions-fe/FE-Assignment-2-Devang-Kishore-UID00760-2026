import { useState } from 'react';

import { LogoutOutlined } from '@mui/icons-material';
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';

import { actionLabels, BORDER_RADIUS } from '@constants';

import { ProfileMenuProps } from './profileMenu.types';

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
                aria-label={`${actionLabels.ACCOUNT_LABEL}`}
                aria-controls={`${open ? actionLabels.ACCOUNT_OPEN : undefined}`}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        sx: {
                            marginTop: 1,
                            minWidth: 240,
                            padding: 2,
                            borderRadius: BORDER_RADIUS.SM,
                            boxShadow: 8,
                            overFlow: 'hidden',
                        },
                    },
                }}
            >
                <Typography variant="body1" color="text">
                    {name}
                </Typography>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        onLogout();
                    }}
                    sx={{ py: 1.5, px: 2 }}
                >
                    <ListItemIcon>
                        <LogoutOutlined fontSize="small" />
                    </ListItemIcon>
                    {actionLabels.LOGOUT}
                </MenuItem>
            </Menu>
        </>
    );
};

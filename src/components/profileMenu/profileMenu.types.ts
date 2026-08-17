import { AvatarProps } from '@mui/material';

export interface ProfileMenuProps extends AvatarProps {
    name: string;
    onLogout: () => void;
}

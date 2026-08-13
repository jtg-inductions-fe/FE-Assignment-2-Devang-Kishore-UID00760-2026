import { SearchbarProps } from '@types';
import { VegToggleProps } from '@types';
import { BadgeIconButtonProps } from '@types';
import { ProfileMenuProps } from '@types';

export interface HeaderProps {
    searchBarProps: SearchbarProps;
    vegToggleProps: VegToggleProps;
    profileMenuProps: ProfileMenuProps;
    ordersButtonProps?: BadgeIconButtonProps;
    cartButtonProps?: BadgeIconButtonProps;
    showCart: boolean;
}

import { BadgeIconButtonProps } from './badgeIconButton.types';
import { ProfileMenuProps } from './profileMenu.types';
import { SearchbarProps } from './searchbarProps.types';
import { VegToggleProps } from './vegToggle.types';

export interface HeaderProps {
    searchBarProps: SearchbarProps;
    vegToggleProps: VegToggleProps;
    profileMenuProps: ProfileMenuProps;
    ordersButtonProps?: BadgeIconButtonProps;
    cartButtonProps?: BadgeIconButtonProps;
    showCart: boolean;
}

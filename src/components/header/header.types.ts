import { SearchbarProps } from '../../types/searchbarProps.types';
import { VegToggleProps } from '../../types/vegToggle.types';
import { BadgeIconButtonProps } from '../badgeIconButton/badgeIconButton.types';
import { ProfileMenuProps } from '../profileMenu/profileMenu.types';

export interface HeaderProps {
    searchBarProps: SearchbarProps;
    vegToggleProps: VegToggleProps;
    profileMenuProps: ProfileMenuProps;
    ordersButtonProps?: BadgeIconButtonProps;
    cartButtonProps?: BadgeIconButtonProps;
    showCart: boolean;
}

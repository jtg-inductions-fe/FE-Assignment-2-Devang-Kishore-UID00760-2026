import { Link } from 'react-router-dom';

import { Divider } from '@mui/material';

import { BadgeIconButton } from '@components/badgeIconButton';
import { Logo } from '@components/logo';
import { MultiToggle } from '@components/multiToggle';
import { ProfileMenu } from '@components/profileMenu';
import { Searchbar } from '@components/searchBar';
import type { HeaderProps } from '@types';

import {
    DesktopHeader,
    HeaderActions,
    HeaderBottom,
    HeaderContainer,
    HeaderSearchContainer,
    HeaderTop,
    LogoContainer,
    MobileHeader,
} from './Header.styled';

export const Header = ({
    searchBarProps,
    vegToggleProps,
    profileMenuProps,
    ordersButtonProps,
    cartButtonProps,
    showCart,
}: HeaderProps) => (
    <>
        <HeaderContainer>
            <MobileHeader>
                <HeaderTop>
                    <LogoContainer>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </LogoContainer>
                    <HeaderActions>
                        {ordersButtonProps && (
                            <BadgeIconButton {...ordersButtonProps} />
                        )}
                        {showCart && cartButtonProps && (
                            <BadgeIconButton {...cartButtonProps} />
                        )}
                        <ProfileMenu {...profileMenuProps} />
                    </HeaderActions>
                </HeaderTop>
                <HeaderBottom>
                    <HeaderSearchContainer>
                        <Searchbar {...searchBarProps} />
                    </HeaderSearchContainer>

                    <MultiToggle {...vegToggleProps} />
                </HeaderBottom>
            </MobileHeader>
            <DesktopHeader>
                <LogoContainer>
                    <Link to="/">
                        <Logo />
                    </Link>
                </LogoContainer>
                <HeaderSearchContainer>
                    <Searchbar {...searchBarProps} />
                </HeaderSearchContainer>
                <MultiToggle {...vegToggleProps} />
                <HeaderActions>
                    {ordersButtonProps && (
                        <BadgeIconButton {...ordersButtonProps} />
                    )}
                    {cartButtonProps && (
                        <BadgeIconButton {...cartButtonProps} />
                    )}
                    <ProfileMenu {...profileMenuProps} />
                </HeaderActions>
            </DesktopHeader>
        </HeaderContainer>
        <Divider />
    </>
);

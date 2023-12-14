import React, {
    useEffect,
    useState
} from 'react';
import {
    DivFlexBox,
    HeaderWrapper,
    MenuButtonHeader,
    LogoLink,
    MenuButtonLinkHeader,
    Logo,
} from '../styled.components';
import BackendService from "../../services/services";
import { useNavigate } from "react-router";
import logo from '../../images/logo.png';

interface HeaderProps {
    log: boolean
}

const Header = ({ log }: HeaderProps) => {

    return (
        <>
            <DivFlexBox>
                <HeaderWrapper>
                    <LogoLink to='/'>
                        <Logo>
                            <img src={ logo } alt=""/>
                        </Logo>
                    </LogoLink>
                    { log && <MenuButtonLinkHeader to='/transactions'>Transactions</MenuButtonLinkHeader> }
                    { log && <MenuButtonLinkHeader to='/dashboard'>Dashboard</MenuButtonLinkHeader> }
                    { log ?
                        <MenuButtonLinkHeader to='/profile'>Profile</MenuButtonLinkHeader> : (
                            <div>
                                <MenuButtonLinkHeader to='/register'>Sing up</MenuButtonLinkHeader>
                                <MenuButtonLinkHeader to='/login'>Sing in</MenuButtonLinkHeader>
                            </div>
                        )
                    }

                </HeaderWrapper>
            </DivFlexBox>
        </>
    );
};

export default Header;

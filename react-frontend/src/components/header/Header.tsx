import React, { useState } from 'react';
import {
	DivFlexBox,
	MenuButtonHeader,
	MenuButtonLinkHeader
} from '../styled.components';
import {
  HeaderWrapper
} from "../styled.components";
import BackendService from "../../services/services";


const Header = () => {
	const [isLogged, setIsLogged] = useState<boolean>(false)
	const login = () => {
		BackendService.login();
		setIsLogged(true);
	}
	return (
		<>
			<DivFlexBox>
				<HeaderWrapper>
					<MenuButtonLink to='/'>Main Page</MenuButtonLink>
					{isLogged && <MenuButtonLink to='/transactions'>Transactions</MenuButtonLink>}
					{
						!isLogged ? <MenuButtonHeader onClick={login}>Login</MenuButtonHeader> :
						<MenuButtonLinkHeader to='/profile'>Profile</MenuButtonLinkHeader>
					}
				</HeaderWrapper>
			</DivFlexBox>
		</>
	);
};

export default Header;

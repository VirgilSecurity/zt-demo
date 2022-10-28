import React, { useState } from 'react';
import {
	DivFlexBox,
	MenuButton,
	MenuButtonLink
} from '../styled.components';
import {
  HeaderWrapper
} from "./styled";
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
					<MenuButtonLink to='/transactions'>Transactions</MenuButtonLink>
					{
						!isLogged ? <MenuButton onClick={login}>Login</MenuButton> :
						<MenuButtonLink to='/profile'>Profile</MenuButtonLink>
					}
				</HeaderWrapper>
			</DivFlexBox>
		</>
	);
};

export default Header;

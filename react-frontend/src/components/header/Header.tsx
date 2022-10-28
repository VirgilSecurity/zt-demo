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
					<MenuButtonLink to='/'>Главная</MenuButtonLink>
					<MenuButtonLink to='/transactions'>Транзакции</MenuButtonLink>
					{
						!isLogged ? <MenuButton onClick={login}>Логин</MenuButton> :
						<MenuButtonLink to='/profile'>Профиль</MenuButtonLink>
					}
				</HeaderWrapper>
			</DivFlexBox>
		</>
	);
};

export default Header;

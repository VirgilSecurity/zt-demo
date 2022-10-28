import React, { useState } from 'react';
import {
  HomeWrapper
} from "./styled";
import {
	MenuButton,
	MenuButtonLink
} from './styled';
import BackendService from "../../services/services";

const Home = () => {
	const [isLogged, setIsLogged] = useState<boolean>(false)
	const login = () => {
		BackendService.login();
		setIsLogged(true);
	}
	return (
		<HomeWrapper>
			<h1>мы самый шифрованный банк в мире, но без денег</h1>
			{
				!isLogged ? <MenuButton onClick={login}>Логин</MenuButton> :
				<MenuButtonLink to='/profile'>Профиль</MenuButtonLink>
			}
		</HomeWrapper>
	);
};

export default Home;

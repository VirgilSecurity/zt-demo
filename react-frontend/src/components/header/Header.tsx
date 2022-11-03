import React, {
	useEffect,
	useState
} from 'react';
import {
	DivFlexBox,
	HeaderWrapper,
	MenuButtonHeader,
	MenuButtonLinkHeader
} from '../styled.components';
import BackendService from "../../services/services";
import { useNavigate } from "react-router";


const Header = () => {
	const [isLogged, setIsLogged] = useState<boolean>(false)
	const navigate = useNavigate();
	const login = () => {
		BackendService.login().then(() => {
			setIsLogged(true);
			navigate('/profile');
		});
	}
	useEffect(() => {
		!isLogged && navigate('/')
	}, [])
	return (
		<>
			<DivFlexBox>
				<HeaderWrapper>
					<MenuButtonLinkHeader to='/'>Main Page</MenuButtonLinkHeader>
					{isLogged && <MenuButtonLinkHeader to='/transactions'>Transactions</MenuButtonLinkHeader>}
					{isLogged && <MenuButtonLinkHeader to='/dashboard'>Dashboard</MenuButtonLinkHeader>}
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

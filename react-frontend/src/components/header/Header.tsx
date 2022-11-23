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
import Modal from "../auth/auth";


const Header = () => {
	const [isLogged, setIsLogged] = useState<boolean>(false)
	const navigate = useNavigate();
	const login = () => {
		BackendService.login().then(() => {
			setIsLogged(true);
			navigate('/profile');
		}).catch((value) => console.error(value));
	}
	useEffect(() => {
		!isLogged && navigate('/')
	}, [])
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<DivFlexBox>
				<HeaderWrapper>
					<LogoLink to='/'>
						<Logo>
							<img src={logo} alt="" />
						</Logo>
					</LogoLink>
					{isLogged && <MenuButtonLinkHeader to='/transactions'>Transactions</MenuButtonLinkHeader>}
					{isLogged && <MenuButtonLinkHeader to='/dashboard'>Dashboard</MenuButtonLinkHeader>}
					{
						!isLogged ? <MenuButtonHeader onClick={login}>Login</MenuButtonHeader> :
						// !isLogged ? <MenuButtonHeader onClick={() => setIsOpen(true)}>Login</MenuButtonHeader> :
						<MenuButtonLinkHeader to='/profile'>Profile</MenuButtonLinkHeader>
					}
				</HeaderWrapper>
				{/* {isOpen && <Modal setIsOpen={setIsOpen} />} */}
			</DivFlexBox>
		</>
	);
};

export default Header;

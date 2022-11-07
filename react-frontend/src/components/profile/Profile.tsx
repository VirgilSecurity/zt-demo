import React, {
	useEffect,
	useState
} from 'react';
import BackendService from '../../services/services';
import { ProfileDetails } from "../../constants/profile.interface";
import {
	ProfileAvatar,
	ProfileCell,
	ProfileInfo,
	ProfileList,
	ProfileListItem,
	ProfileName,
	ProfileWrapper,
	Title
} from './styled';
import avatar from '../../images/avatar.svg';
import { DivFlexJustify } from '../styled.components';


const Profile = () => {
	const [profileInfo, setProfileInfo] = useState<ProfileDetails>();
	useEffect(() => {
		BackendService.getProfileDetails().then((value) => {
			setProfileInfo(value)
		}).catch((value) => console.error(value))
	}, [])
	return (
		<ProfileWrapper>
			<Title>Profile Page</Title>
			<ProfileInfo>
				<ProfileAvatar>
					<img src={avatar} alt=""/>
				</ProfileAvatar>
				<ProfileName>{profileInfo?.name}</ProfileName>
			</ProfileInfo>
			<ProfileList>
				<ProfileListItem key='0'>
					<DivFlexJustify>
						<ProfileCell>
							Created Date
						</ProfileCell>
						<ProfileCell>
							Current Balance
						</ProfileCell>
					</DivFlexJustify>
				</ProfileListItem>
				{profileInfo?.accounts.map((value, index) => {
					return (<ProfileListItem key={index}>
						<DivFlexJustify>
							<ProfileCell>
								{value.createdDate}
							</ProfileCell>
							<ProfileCell>
								{value.balance + ' ' + value.currency}
							</ProfileCell>
						</DivFlexJustify>
					</ProfileListItem>);
				})}
			</ProfileList>
		</ProfileWrapper>
	);
};

export default Profile;

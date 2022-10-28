import React, {
	useEffect,
	useState
} from 'react';
import BackendService from '../../services/services';
import { ProfileDetails } from "../../constants/profile.interface";
import { ProfileWrapper, Title, ProfileInfo, ProfileAvatar, ProfileName, ProfileList, ProfileListItem } from './styled';
import avatar from '../../images/avatar.svg';


const Profile = () => {
	const [profileInfo, setProfileInfo] = useState<ProfileDetails>();
	useEffect(() => {
		BackendService.getProfileDetails().then((value) => {
			setProfileInfo(value.data)
		});
	}, [])
	console.log(profileInfo);
	return (
		<ProfileWrapper>
			<Title>Profile Page</Title>
			<ProfileInfo>
				<ProfileAvatar>
					<img src={avatar} alt="" />
				</ProfileAvatar>
				<ProfileName>Гений Соблазнитель</ProfileName>
			</ProfileInfo>
			<ProfileList>
				<ProfileListItem>List item 1</ProfileListItem>
				<ProfileListItem>List item 1</ProfileListItem>
				<ProfileListItem>List item 1</ProfileListItem>
				<ProfileListItem>List item 1</ProfileListItem>
				<ProfileListItem>List item 1</ProfileListItem>
			</ProfileList>
		</ProfileWrapper>
	);
};

export default Profile;

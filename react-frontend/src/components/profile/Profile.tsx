import React, {
	useEffect,
	useState
} from 'react';
import BackendService from '../../services/services';
import { ProfileDetails } from "../../constants/profile.interface";


const Profile = () => {
	const [profileInfo, setProfileInfo] = useState<ProfileDetails>();
	useEffect(() => {
		BackendService.getProfileDetails().then((value) => {
			setProfileInfo(value.data)
		});
	}, [])
	console.log(profileInfo);
	return (
		<div>
			Profile Page
		</div>
	);
};

export default Profile;

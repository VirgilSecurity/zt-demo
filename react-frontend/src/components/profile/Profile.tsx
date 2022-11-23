import React, {
	useEffect,
	useState
} from 'react';
import BackendService from '../../services/services';
import {
	ProfileDetails,
	RegisterInterface,
	Status,
	StatusInterface
} from "../../constants/profile.interface";
import {
	ProfileAvatar,
	ProfileCell,
	ProfileInfo,
	ProfileList,
	ProfileListItem,
	ProfileName,
	ProfileWrapper,
	Title,
	ProfileVerified,
	DivFlexJustify,
	ProfileUnverified
} from '../styled.components';
import avatar from '../../images/avatar.svg';
import Modal from "../modal/Modal";

const Profile = () => {
	const [profileInfo, setProfileInfo] = useState<ProfileDetails>();
	const [isVerified, setIsVerified] = useState<Status>();
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		BackendService.getProfileDetails().then((value) => {
			setProfileInfo(value);
		}).catch((value) => console.error(value));
		BackendService.getKycStatus().then((value) => {
			setIsVerified(value.status);
		}).catch((value) => console.error(value));
	}, []);
	return (
		<ProfileWrapper>
			<Title>Profile Page</Title>
			<ProfileInfo>
				<ProfileAvatar>
					{ isVerified === 'verified' ?  <ProfileVerified>Verified</ProfileVerified> : <ProfileUnverified disabled={isVerified === 'KYC pending'} onClick={() => setIsOpen(true)}>Unverified</ProfileUnverified>}
					<img src={avatar} alt=""/>
				</ProfileAvatar>
				<ProfileName>{profileInfo?.name}</ProfileName>
			</ProfileInfo>
			{isOpen && <Modal setIsOpen={setIsOpen} setVerified={setIsVerified}/>}
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

import React, {
	useEffect,
	useState
} from 'react';
import BackendService from '../../services/services';
import {
	ProfileDetails,
	Status
} from "../../constants/profile.interface";
import {
	DivFlexJustify,
	PassButton,
	ProfileAvatar,
	ProfileCell,
	ProfileInfo,
	ProfileList,
	ProfileListItem,
	ProfileName,
	ProfileUnverified,
	ProfileVerified,
	ProfileVerifyPending,
	ProfileWrapper,
	Title
} from '../styled.components';
import avatar from '../../images/avatar.svg';
import Modal from "../modal/Modal";


const Profile = () => {
	const [profileInfo, setProfileInfo] = useState<ProfileDetails>();
	const [isVerified, setIsVerified] = useState<Status>();
	const [isOpen, setIsOpen] = useState(false);
	const [image, setImage] = useState(avatar);
	const getKycStatus = () => {
		BackendService.getKycStatus()
			.then((value) => {
				setIsVerified(value.status);
			})
			.catch((value) => console.error(value));
	}
	useEffect(() => {
		BackendService.getProfileDetails()
			.then((value) => {
				setProfileInfo(value);
			})
			.catch((value) => console.error(value));
		getKycStatus();
	}, []);
	const updateImage = (newImage: any) => {
		setImage(URL.createObjectURL(newImage));
	}
	const displayStatus = () => {
		switch (isVerified) {
			case 'verified':
				return (<ProfileVerified>Verified</ProfileVerified>)
			case 'not_verified':
				return (<ProfileUnverified>Unverified</ProfileUnverified>)
			case 'KYC pending':
				return (<ProfileVerifyPending>Pending</ProfileVerifyPending>)
		}
	}
	const displayRegister = () => {
		switch (isVerified) {
			case 'verified':
				return (<></>)
			case 'not_verified':
				return (<PassButton onClick={() => setIsOpen(true)}>Pass now </PassButton>)
			case 'KYC pending':
				return (<PassButton onClick={getKycStatus}>Update status</PassButton>)
		}
	}
	return (
		<ProfileWrapper>
			<Title>Profile Page</Title>
			<ProfileInfo>
				<ProfileAvatar>
					{displayStatus()}
					<img src={isVerified === 'verified' ? image : avatar} alt=""/>
				</ProfileAvatar>
				{displayRegister()}
				<ProfileName>{profileInfo?.name}</ProfileName>
			</ProfileInfo>
			{isOpen && <Modal setIsOpen={setIsOpen} setVerified={setIsVerified} image={updateImage}/>}
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

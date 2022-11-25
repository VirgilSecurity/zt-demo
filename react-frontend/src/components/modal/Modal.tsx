import React, { useState } from "react";
import { FileUploader } from 'react-drag-drop-files';
import {
	Overlay,
	AuthBody,
	ModalDiv,
	ModalHeader,
	CloseModal,
	ModalForm,
	AuthButton,
} from '../styled.components';
import BackendService from "../../services/services";
import {
	RegisterInterface
} from "../../constants/profile.interface";


const fileTypes = ["JPG", "PNG", "GIF"];

const Modal = (props: any,) => {
	const [registerData, setRegisterData] = useState<RegisterInterface>({
		name: '',
		secondName: '',
		email: '',
		file: null,
	})
	const fileUpload = (file: any) => {
		props?.image(file);
		let obj = {
			lastModified    : file.lastModified,
			lastModifiedDate : file.lastModifiedDate,
			name             : file.name,
			size             : file.size,
			type             : file.type
		}
		handleChange({file: obj});
	};
	const handleChange = (value: {name: string} | {secondName: string} | {email: string} | {file : any}) => {
		setRegisterData((oldValue) => ({
			...oldValue,
			...value
		}))
	};
	const acceptedClose = () => {
		BackendService.registerInKyc(registerData).then((value) => {
				props?.setVerified(value.status);
				props?.setIsOpen(false);
		})
	}
	return (
		<>
			<Overlay onClick={() => props?.setIsOpen(false)}></Overlay>
			<AuthBody>
				<ModalDiv>
					<ModalHeader>Authorization</ModalHeader>
					<CloseModal onClick={() => props?.setIsOpen(false)}></CloseModal>
					<ModalForm>
						<input type="text" placeholder="Name" onChange={(e) => handleChange({name : e.currentTarget.value})}/>
						<input type="text" placeholder="Second Name" onChange={(e) => handleChange({secondName: e.currentTarget.value})}/>
						<input type="email" placeholder="Email" onChange={(e) => handleChange({email: e.currentTarget.value})}/>
						<FileUploader handleChange={fileUpload} name="file" types={fileTypes}/>
						<AuthButton onClick={acceptedClose}>Send</AuthButton>
					</ModalForm>
				</ModalDiv>
			</AuthBody>
		</>
	);
};

export default Modal;

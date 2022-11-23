import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {
	Overlay,
	AuthBody,
	Modal,
	ModalHeader,
	CloseModal,
	ModalForm,
  AuthButton,
} from '../styled.components';

const fileTypes = ["JPG", "PNG", "GIF"];

const Auth = (props: any,) => {
  const [file, setFile] = useState(null);
  const handleChange = (file: React.SetStateAction<null>) => {
    setFile(file);
  };
  return (
    <>
      <Overlay onClick={() => props?.setIsOpen(false)}></Overlay>
      <AuthBody>
        <Modal>
          <ModalHeader>Authorization</ModalHeader>
          <CloseModal onClick={() => props?.setIsOpen(false)}></CloseModal>
          <ModalForm>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Second Name" />
            <input type="email" placeholder="Email"/>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <AuthButton>Send</AuthButton>
          </ModalForm>
        </Modal>
      </AuthBody>
    </>
  );
};

export default Auth;
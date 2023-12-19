import React, { useState } from 'react';
import { DivFlexBox, DivFlexBoxColumn, MenuButton, Wrapper } from "../styled.components";
import BackendService from "../../services/services";
import { useNavigate } from "react-router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const Register = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        setIsLoading(true);
        BackendService.register(email).then((value) => {
            setIsLoading(false);
            alert("Successfully register! Login with your email, now!")
            navigate('/login');
        })
    }

    return (
        <LoadingOverlayWrapper
            className={'loader'}
            active={isLoading}
            spinner
            text='Loading some...'
        >
        <Wrapper>
            <DivFlexBox>
                <DivFlexBoxColumn>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <MenuButton disabled={email.length < 1} onClick={handleRegister}>Register with passkeys!</MenuButton>
                </DivFlexBoxColumn>
            </DivFlexBox>
        </Wrapper>
        </LoadingOverlayWrapper>
    );
};

export default Register;

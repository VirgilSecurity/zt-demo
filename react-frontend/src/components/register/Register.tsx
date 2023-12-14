import React, { useState } from 'react';
import { DivFlexBox, DivFlexBoxColumn, MenuButton, Wrapper } from "../styled.components";
import BackendService from "../../services/services";
import { useNavigate } from "react-router";

const Register = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        BackendService.register(email).then((value) => {
            alert("Successfully register! Login with your email, now!")
            navigate('/login');
        })
    }

    return (
        <Wrapper>
            <DivFlexBox>
                <DivFlexBoxColumn>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <MenuButton disabled={email.length < 1} onClick={handleRegister}>Register with passkeys!</MenuButton>
                </DivFlexBoxColumn>
            </DivFlexBox>
        </Wrapper>
    );
};

export default Register;

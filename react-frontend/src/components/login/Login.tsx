import React, { Dispatch, SetStateAction, useState } from 'react';
import { DivFlexBox, DivFlexBoxColumn, MenuButton, Wrapper } from "../styled.components";
import { useNavigate } from "react-router";
import BackendService from "../../services/services";

interface Login {
    onLogged: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ onLogged }: Login) => {
    const [ email, setEmail ] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        BackendService.login(email).then((value) => {
            console.log(value);
            alert("Successfully Login!")
            onLogged(true);
            navigate('/profile');
        })
    }

    return (
        <Wrapper>
            <DivFlexBox>
                <DivFlexBoxColumn>
                    <input type="email" placeholder="Email" onChange={ (e) => setEmail(e.currentTarget.value) }/>
                    <MenuButton disabled={ email.length < 1 } onClick={ handleLogin }>Login with
                        passkeys!</MenuButton>
                </DivFlexBoxColumn>
            </DivFlexBox>
        </Wrapper>
    );
};

export default Login;

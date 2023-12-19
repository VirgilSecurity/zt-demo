import React, { useState } from 'react';
import Header from "./components/header/Header";
import {
    Route,
    Routes, useNavigate, useParams
} from "react-router";
import Home from "./components/home/Home";
import Transaction from "./components/transaction/Transaction";
import Profile from "./components/profile/Profile";
import { BrowserRouter } from "react-router-dom";
import { Wrapper } from "./components/styled.components";
import {
    LogContainer,
} from "./components/console.js";
import Dashboard from "./components/charts/Dashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";


function App() {
    const [ isLogged, setIsLogged ] = useState(false);
    const KYCws = new WebSocket(process.env.REACT_APP_WEB_SOKET_KYC);
    KYCws.onopen = () => {
        console.log('KYC', 'KYC WebSocket opened');
    };
    KYCws.onmessage = (message) => {
        console.log('KYC', message.data);
    };
    const ExpressWs = new WebSocket(process.env.REACT_APP_WEB_SOKET_BACKEND);
    ExpressWs.onopen = () => {
        console.log('Backend', 'Backend WebSocket opened');
    };
    ExpressWs.onmessage = (message) => {
        console.log('Backend', message.data);
    };
    return (
        <BrowserRouter>
            <Header log={ isLogged }/>
            <Wrapper>
                <Routes>
                    <Route path='/' element={ <Home/> }/>
                    <Route path='/transactions' element={ <Transaction logged={isLogged}/> }/>
                    <Route path='/profile' element={ <Profile logged={isLogged}/> }/>
                    <Route path='/dashboard' element={ <Dashboard logged={isLogged}/> }/>
                    <Route path='/login' element={ <Login onLogged={ setIsLogged }/> }/>
                    <Route path='/register' element={ <Register/> }/>
                </Routes>
                <LogContainer/>
            </Wrapper>
        </BrowserRouter>
    );
}

export default App;

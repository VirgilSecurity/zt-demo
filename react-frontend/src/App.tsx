import React, { useState } from 'react';
import Header from "./components/header/Header";
import {
	Route,
	Routes
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
	const [isLogged, setIsLogged] = useState(false);
	const url = 'wss://' + new URL(window.location.href).host;
	const KYCws = new WebSocket(url + ':33434');
	KYCws.onopen = () => {
		console.log('KYC', 'KYC WebSocket opened');
	};
	KYCws.onmessage = (message) => {
		console.log('KYC', message.data);
	};
	const ExpressWs = new WebSocket(url + ':33433');
	ExpressWs.onopen = () => {
		console.log('Backend', 'Backend WebSocket opened');
	};
	ExpressWs.onmessage = (message) => {
		console.log('Backend', message.data);
	};
	return (
		<BrowserRouter>
			<Header log={isLogged}/>
			<Wrapper>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/transactions' element={<Transaction/>}/>
					<Route path='/profile' element={<Profile/>}/>
					<Route path='/dashboard' element={<Dashboard/>}/>
					<Route path='/login' element={<Login onLogged={setIsLogged}/>}/>
					<Route path='/register' element={<Register/>}/>
				</Routes>
				<LogContainer/>
			</Wrapper>
		</BrowserRouter>
	);
}

export default App;

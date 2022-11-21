import React from 'react';
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


function App() {
	const KYCws = new WebSocket('ws://localhost:3004');
	KYCws.onopen = () => {
		console.log('KYC WebSocket opened');
		KYCws.send('data');
	};
	KYCws.onmessage = (message) => {
		console.log(message.data);
	};
	const ExpressWs = new WebSocket('ws://localhost:3002');
	ExpressWs.onopen = () => {
		console.log('Express WebSocket opened');
		KYCws.send('data');
	};
	ExpressWs.onmessage = (message) => {
		console.log(message.data);
	};
	return (
		<BrowserRouter>
			<Header/>
			<Wrapper>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/transactions' element={<Transaction/>}/>
					<Route path='/profile' element={<Profile/>}/>
					<Route path='/dashboard' element={<Dashboard/>}/>
				</Routes>
				<LogContainer/>
			</Wrapper>
		</BrowserRouter>
	);
}

export default App;

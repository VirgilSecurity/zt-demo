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

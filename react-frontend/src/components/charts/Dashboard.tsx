import React, {
	useEffect,
	useState
} from 'react';
import BackendService from "../../services/services";
import {
	ApplicationChart,
	DevicesChart,
	PolicesChart,
	TransactionsChart,
	UsersChart
} from "../../constants/charts.interfaces";
import TransactionsChartComponent from './components/TransactionsChart';
import {
	DashboardButton,
	DashboardContainer,
	DashboardLeftMenu,
	DashboardRightMenu
} from "../styled.components";
import ApplicationChartComponent from "./components/ApplicationChartComponent";
import PolicesChartComponent from "./components/PolicesChartComponent";
import UsersChartComponent from "./components/UsersChartComponent";
import DevicesChartComponent from "./components/DevicesChartComponent";


const Dashboard = () => {
	const [application, setApplication] = useState<ApplicationChart[]>([]);
	const [polices, setPolices] = useState<PolicesChart[]>([]);
	const [users, setUsers] = useState<UsersChart[]>([]);
	const [devices, setDevices] = useState<DevicesChart[]>([]);
	const [transactions, setTransactions] = useState<TransactionsChart[]>([]);
	const [tab, setTab] = useState<number>(0);
	useEffect(() => {
		BackendService.getCharts().then((value) => {
			setApplication(value.application);
			setPolices(value.polices);
			setUsers(value.users);
			setDevices(value.devices);
			setTransactions(value.transactions);
		}).catch((value) => console.error(value))
	}, [])
	const ChooseRightComponent = (index: number) => {
		switch (index) {
			case 0:
				return <ApplicationChartComponent data={application}/>
			case 1:
				return <PolicesChartComponent data={polices}/>
			case 2:
				return <UsersChartComponent data={users}/>
			case 3:
				return <DevicesChartComponent data={devices}/>
			case 4:
				return <TransactionsChartComponent data={transactions}/>
		}
	}
	return (
		<DashboardContainer>
			<DashboardLeftMenu>
				<DashboardButton value='0' onClick={(e) => setTab(+e.currentTarget.value)}>Applications</DashboardButton>
				<DashboardButton value='1' onClick={(e) => setTab(+e.currentTarget.value)}>Polices</DashboardButton>
				<DashboardButton value='2' onClick={(e) => setTab(+e.currentTarget.value)}>Users</DashboardButton>
				<DashboardButton value='3' onClick={(e) => setTab(+e.currentTarget.value)}>Devices</DashboardButton>
				<DashboardButton value='4' onClick={(e) => setTab(+e.currentTarget.value)}>Transactions</DashboardButton>
			</DashboardLeftMenu>
			<DashboardRightMenu>
				{ChooseRightComponent(tab)}
			</DashboardRightMenu>
		</DashboardContainer>
	);
};


export default Dashboard;

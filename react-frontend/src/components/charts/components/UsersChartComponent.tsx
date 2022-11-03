import React from 'react';
import { UsersChart } from "../../../constants/charts.interfaces";
import { v4 as uuid } from "uuid";
import { Table } from "../utils/table.template";

const UsersChartComponent = (props: {data: UsersChart[]}) => {
	const columns = React.useMemo(() => [
		{Header: "Username", accessor: "username", Cell: (tableProps: any) => (
				<div>
					<div>{tableProps.row.original.username}</div>
				</div>
			)},
		{Header: "Full name", accessor: "fullName", Cell: (tableProps: any) => (
				<div>
					{tableProps.row.original.fullName}
				</div>
			)},
		{Header: "Policy", accessor: "policy", Cell: (tableProps: any) => (
				<div>
					{tableProps.row.original.policy}
				</div>
			)},
		{Header: "Last active", accessor: "lastActive", Cell: (tableProps: any) => (
				<div>
					{tableProps.row.original.lastActive}
				</div>
			)},
		{Header: "Devices", accessor: "devices", Cell: (tableProps: any) => (
				<div>
					{tableProps.row.original.devices}
				</div>
			)}
	], []);
	const data = props.data.map((value) => value);
	return (
		<div>
			<Table columns={columns} data={data}></Table>
		</div>
	);
};

export default UsersChartComponent;

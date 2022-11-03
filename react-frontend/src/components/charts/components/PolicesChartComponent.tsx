import React from 'react';
import {v4 as uuid} from 'uuid'
import { PolicesChart } from "../../../constants/charts.interfaces";
import { Table } from "../utils/table.template";


const PolicesChartComponent = (props: {data: PolicesChart[]}) => {
	const columns = React.useMemo(() => [
		{Header: "Policy name", accessor: "name", Cell: (tableProps: any) => (
			<div>
				<div>{tableProps.row.original.name}</div>
				<div>{uuid()}</div>
			</div>
			)},
		{Header: "Last edited", accessor: "editDate", Cell: (tableProps: any) => (
				<div>
					{tableProps.row.original.editDate}
				</div>
			)},
		{Header: "Action", accessor: "action", Cell: (tableProps: any) => (
				<div>
					{tableProps.row.original.action}
				</div>
			)},
		{Header: "Enabled", accessor: "enabled", Cell: (tableProps: any) => (
				<div>
					{'' + tableProps.row.original.enabled}
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

export default PolicesChartComponent;

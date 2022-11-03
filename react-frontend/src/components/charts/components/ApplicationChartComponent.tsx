import React from 'react';
import {
	ApplicationChart,
} from "../../../constants/charts.interfaces";
import greenLock from '../../../images/green.svg';
import yellowLock from '../../../images/yellow.svg';
import redLock from '../../../images/red.svg';
import { Table } from "../utils/table.template";

function chooseImg (str: string) {
	switch (str) {
		case "Green":
			return greenLock;
		case "Yellow":
			return yellowLock;
		case "Red":
			return redLock;
	}
}

const ApplicationChartComponent = (props: {data: ApplicationChart[]}) => {
	const columns = React.useMemo(() => [
		{Header: "Application Name", accessor: "name"},
		{Header: "Application URL", accessor: "url"},
		{Header: "Rules Assigned", accessor: "assignedRules"},
		{Header: "Is encrypted", accessor: "status", Cell: (tableProps: any) => (
			// eslint-disable-next-line jsx-a11y/alt-text
			<img
				src={chooseImg(tableProps.row.original.status)}
				width='50px'
			/>
		)}
	], []);
	const data = props.data.map((value) => value);
	return (
		<div>
			<Table columns={columns} data={data}></Table>
		</div>
	);
};

export default ApplicationChartComponent;

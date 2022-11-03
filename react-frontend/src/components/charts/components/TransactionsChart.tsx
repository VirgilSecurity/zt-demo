import React from 'react';
import { TransactionsChart } from "../../../constants/charts.interfaces";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	Legend,
	LinearScale,
	Title,
	Tooltip
} from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const TransactionsChartComponent = (props : {data: TransactionsChart[]}) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Transactions',
				color: "#fff",
			},
		},
		scales: {
      y: {
        ticks: {
          color: '#fff',
        }
      },
			x: {
        ticks: {
          color: '#fff',
        }
      }
    }
	};
	const data = {
		labels : props.data.map((value) => value.createdDate),
		datasets: [
			{
				label: 'Transactions',
				data: props.data.map((value) => value.count),
				backgroundColor: '#4E62C0',
				bodyFontColor: "#fff"
			}
		],
	};

	return (
	<div style={{width: '100%'}}>
		<Bar data={data} options={options}/>
	</div>
	);
};

export default TransactionsChartComponent;

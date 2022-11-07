import React from 'react';
import {
	DevicesWrapper,
	Tags
} from '../../styled.components';
import { DevicesChart } from "../../../constants/charts.interfaces";


const DevicesChartComponent = (props: {data: DevicesChart[]}) => {
	return (
		<>
			{props.data.map((value, index) => {
				return (
					<DevicesWrapper key={index}>
						<div>
							{value.name}
						</div>
						<div>
							{value.os}
						</div>
						<div>
							{value.tags.map((value, index) => (
								<Tags key={index}>
									{value}
								</Tags>
							))}
						</div>
					</DevicesWrapper>
				)
			})}
		</>
	);
};

export default DevicesChartComponent;

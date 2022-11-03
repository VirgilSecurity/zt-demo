import React from 'react';
import { DevicesWrapper } from '../../styled.components';
import { DevicesChart } from "../../../constants/charts.interfaces";


const DevicesChartComponent = (props: {data: DevicesChart[]}) => {
	return (
		<>
			{props.data.map((value) => {
				return (
					<DevicesWrapper>
						<div>
							{value.name}
						</div>
						<div>
							{value.os}
						</div>
						<div>
							{value.tags.map((value) => (
								<div>
									{value}
								</div>
							))}
						</div>
					</DevicesWrapper>
				)
			})}
		</>
	);
};

export default DevicesChartComponent;

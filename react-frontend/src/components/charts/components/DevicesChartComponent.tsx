import React from 'react';
import { DivFlexBox } from '../../styled.components';
import { DevicesChart } from "../../../constants/charts.interfaces";


const DevicesChartComponent = (props: {data: DevicesChart[]}) => {
	return (
		<>
			{props.data.map((value) => {
				return (
					<DivFlexBox>
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
					</DivFlexBox>
				)
			})}
		</>
	);
};

export default DevicesChartComponent;

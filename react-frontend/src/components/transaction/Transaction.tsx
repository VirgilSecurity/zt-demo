import React, {
	useEffect,
	useState
} from 'react';
import {
	DivFlexBox,
	DivFlexBoxColumn,
	MenuButton
} from "../styled.components";
import { Filter } from "../../constants/filters.inteface";
import BackendService from "../../services/services";
import { Transactions } from "../../constants/profile.interface";


const Transaction = () => {
	const [filters, setFilters] = useState<Filter>({
		from: "555-555-555-55",
		to: '',
		amount: 0,
	});
	const [transactions, setTransactions] = useState<Transactions[]>([])
	const handleChange = (value: {to: string} | {amount: number}) => {
		setFilters((oldValue) => ({
			...oldValue,
			...value
		}))
	};
	const doTransaction = () => {
		BackendService.getTransaction(filters)
	}
	useEffect(() => {
		BackendService.getAccountDetails().then((value) => {
			setTransactions(value.transactions);
		})
	}, [])
	return (
		<DivFlexBoxColumn>
			<DivFlexBox>
				<div>
					<span>Кому</span>
					<select>
						<option value='234-234-234-234' onSelect={(e) => handleChange({to: e.currentTarget.value})}>234-234-234-234</option>
					</select>
				</div>
				<div>
					<span>Сумма транзакции</span>
					<input placeholder='Сумма' onInput={(e) => handleChange({amount: +e.currentTarget.value})}/>
				</div>
				<MenuButton onClick={doTransaction}>Создать тразакцию</MenuButton>
			</DivFlexBox>
			<DivFlexBox>
				<div>{transactions[0]?.type}</div>
				<div>{transactions[0]?.amount}</div>
				<div>{transactions[0]?.createdDate}</div>
			</DivFlexBox>
		</DivFlexBoxColumn>
	);
};

export default Transaction;

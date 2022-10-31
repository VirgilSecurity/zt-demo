import React, {
	useEffect,
	useState
} from 'react';
import {
	DivFlexBox,
	DivFlexBoxColumn,
	DivFlexJustify,
	MenuButton
} from "../styled.components";
import { Filter } from "../../constants/filters.inteface";
import BackendService from "../../services/services";
import {
	TransactionsWrapper,
	TransactionsItem,
	TransactionsLabel,
	TransactionInfo
} from './styled';
import {
	AccountDetails,
	Currency,
	Transactions
} from "../../constants/profile.interface";
import {
	ProfileCell,
	ProfileList,
    ProfileListItem
} from "../profile/styled";


const Transaction = () => {
	const [filters, setFilters] = useState<Filter>({
		from: "555-555-555-55",
		to: '234-234-234-234',
		currency: 'EUR',
		amount: 0,
	});
	const [transactions, setTransactions] = useState<Transactions[]>([])
	const handleChange = (value: {to: string} | {amount: number} | {currency: Currency}) => {
		setFilters((oldValue) => ({
			...oldValue,
			...value
		}))
	};
	const doTransaction = () => {
		BackendService.getTransaction(filters)
	}
	useEffect(() => {
		BackendService.getAccountDetails().then((value: AccountDetails) => {
			setTransactions(value.transactions);
		})
	}, [])
	return (
		<DivFlexBoxColumn style={{margin: "auto"}}>
			<DivFlexBox>
				<TransactionsWrapper>
					<TransactionsItem>
						<TransactionsLabel>To:</TransactionsLabel>
						<select>
							<option value='234-234-234-234' onSelect={(e) => handleChange({to: e.currentTarget.value})}>234-234-234-234</option>
						</select>
					</TransactionsItem>
					<TransactionsItem>
						<TransactionsLabel>Currency:</TransactionsLabel>
						<select>
							<option value='EUR' onSelect={(e) => handleChange({to: e.currentTarget.value})}>EUR</option>
							<option value='USD' onSelect={(e) => handleChange({currency: e.currentTarget.value as Currency})}>USD</option>
						</select>
					</TransactionsItem>
					<TransactionsItem>
						<TransactionsLabel>Sum of transaction:</TransactionsLabel>
						<input placeholder='Sum' onInput={(e) => handleChange({amount: +e.currentTarget.value})}/>
					</TransactionsItem>
					<MenuButton onClick={doTransaction}>Create Transaction</MenuButton>
				</TransactionsWrapper>
			</DivFlexBox>
			<DivFlexBox>
				<TransactionInfo>
				<ProfileList key='0'>
					<ProfileListItem>
						<DivFlexJustify>
							<ProfileCell>
								Operation type
							</ProfileCell>
							<ProfileCell>
								Operation amount
							</ProfileCell>
							<ProfileCell>
								Date of operation
							</ProfileCell>
						</DivFlexJustify>
					</ProfileListItem>
					{transactions.map((value, index) => {
						return (<ProfileListItem key={index}>
									<DivFlexJustify>
										<ProfileCell>
											{value.type}
										</ProfileCell>
										<ProfileCell>
											{value.amount}
										</ProfileCell>
										<ProfileCell>
											{value.createdDate}
										</ProfileCell>
									</DivFlexJustify>
								</ProfileListItem>)
					})}
				</ProfileList>
				</TransactionInfo>
			</DivFlexBox>
		</DivFlexBoxColumn>
	);
};

export default Transaction;

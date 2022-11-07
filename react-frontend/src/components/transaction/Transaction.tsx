import React, {
	useEffect,
	useState
} from 'react';
import { Filter } from "../../constants/filters.inteface";
import BackendService from "../../services/services";
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
import {
	DivFlexBox,
	DivFlexBoxColumn,
	DivFlexJustify,
	MenuButtonHeader,
	TransactionInfo,
	TransactionsItem,
	TransactionsLabel,
	TransactionsWrapper
} from '../styled.components';
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { isNumber } from "util";


const Transaction = () => {
	const [error, setError] = useState<{isError: boolean, errorText: string}>({
		isError: false,
		errorText: ''
	})
	const [inputError, setInputError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
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
		console.clear();
		setIsLoading(true);
		BackendService.getTransaction(filters).then((value) => {
			if (typeof value === "string") {
				setError({isError: true, errorText: value})
				setIsLoading(false);
				return;
			}
			callTable();
		});
	}
	useEffect(() => {
		console.clear()
		callTable();
	}, [])
	const callTable = () => {
		setError({isError: false, errorText: ''})
		BackendService.getAccountDetails('555-555-555-555').then((value: AccountDetails) => {
			setTransactions(value.transactions);
			setIsLoading(false);
		}).catch((value) => console.error(value));
	}
	return (
		<LoadingOverlayWrapper
			className={'loader'}
			active={isLoading}
			spinner
			text='Loading some...'
		>
		<DivFlexBoxColumn style={{margin: "auto"}}>
			<DivFlexBox>
				<TransactionsWrapper>
					<TransactionsItem>
						<TransactionsLabel>To:</TransactionsLabel>
						<select onChange={(e) => handleChange({to: e.currentTarget.value})}>
							<option value='234-234-234-234'>234-234-234-234</option>
						</select>
					</TransactionsItem>
					<TransactionsItem>
						<TransactionsLabel>Currency:</TransactionsLabel>
						<select onChange={(e) => handleChange({currency: e.currentTarget.value as Currency})}>
							<option value='EUR'>EUR</option>
							<option value='USD'>USD</option>
						</select>
					</TransactionsItem>
					<TransactionsItem>
						<TransactionsLabel>Sum of transaction:</TransactionsLabel>
						<input placeholder='Sum' type="text" pattern="[0-9]*" onInput={(e) => {
							if (isNaN(+e.currentTarget.value)) {
								setInputError(true);
							} else {
								setInputError(false)
								handleChange({amount: +e.currentTarget.value})}
							}
						}
						/>
						<TransactionsLabel style={{display: inputError ? 'flex' : 'none', color: 'red'}}>Error: We need only numbers!</TransactionsLabel>
					</TransactionsItem>
					<MenuButtonHeader className={isLoading ? 'greenBg' : ''} onClick={doTransaction} disabled={inputError}>Create Transaction</MenuButtonHeader>
					<TransactionsLabel style={{display: error.isError ? 'flex' : 'none', color: 'red'}}>Error: {error.errorText}</TransactionsLabel>
				</TransactionsWrapper>
			</DivFlexBox>
			<DivFlexBox>
				<TransactionInfo>
				<ProfileList key='0'>
					<ProfileListItem>
						<DivFlexJustify>
							<ProfileCell>
								Currency type
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
											{value.currency}
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
		</LoadingOverlayWrapper>
	);
};

export default Transaction;

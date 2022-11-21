import { Currency } from './profile.interface';


export interface AccountDetails {
	transactions: Transactions[],
}

export type TransactionType = 'DEBIT' | 'CREDIT';

export interface Transactions {
	createdDate: string,
	amount: string,
	currency: Currency,
	type:TransactionType,
}

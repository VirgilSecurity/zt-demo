export interface ProfileDetails {
	name: string;
	accounts: Accounts[],
}

export type Currency = 'USD' | 'RUB' | 'EUR';

export interface Accounts {
	id: string;
	createdDate: string;
	balance: string;
	currency: Currency;
}

export interface AccountDetails {
	transactions: Transactions[],
}

export type TransactionType = 'DEBIT' | 'CREDIT';

export interface Transactions {
	createdDate: string,
	amount: string,
	type:TransactionType,
}

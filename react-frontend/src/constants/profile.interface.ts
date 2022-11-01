export interface ProfileDetails {
	name: string;
	accounts: Accounts[],
}

export type Currency = 'USD' | 'EUR';

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
	currency: Currency,
	type:TransactionType,
}

// export interface buttonBg: boolean

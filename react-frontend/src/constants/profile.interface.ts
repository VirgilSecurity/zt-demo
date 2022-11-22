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

export interface StatusInterface {
	status: Status,
	need_verify: boolean;
}

export type Status = 'not_verified' | 'verified' | 'KYC pending';


export interface RegisterInterface {
	name: string;
	secondName: string;
	email: string;
}

// export interface buttonBg: boolean

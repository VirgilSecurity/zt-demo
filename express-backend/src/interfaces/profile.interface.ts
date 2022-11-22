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

export interface RegisterInterface {
	name: string;
	secondName: string;
	email: string;
}

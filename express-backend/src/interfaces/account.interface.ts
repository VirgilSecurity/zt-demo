export interface AccountDetails {
	transactions: Transactions[],
}

export type TransactionType = 'DEBIT' | 'CREDIT';

export interface Transactions {
	createdDate: string,
	amount: string,
	type:TransactionType,
}

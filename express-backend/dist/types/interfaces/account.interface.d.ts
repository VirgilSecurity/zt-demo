export interface AccountDetails {
    transactions: Transactions[];
}
export declare type TransactionType = 'DEBIT' | 'CREDIT';
export interface Transactions {
    createdDate: string;
    amount: string;
    type: TransactionType;
}

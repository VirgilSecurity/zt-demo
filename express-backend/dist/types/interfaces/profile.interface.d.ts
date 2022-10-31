export interface ProfileDetails {
    name: string;
    accounts: Accounts[];
}
export declare type Currency = 'USD' | 'EUR';
export interface Accounts {
    id: string;
    createdDate: string;
    balance: string;
    currency: Currency;
}

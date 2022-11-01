import { Currency } from "./profile.interface";


export interface Filter {
	from: string;
	to: string;
	currency: string;
	amount: number;
}

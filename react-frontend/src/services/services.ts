import { Axios, AxiosResponse } from "axios";
import { PublicKey } from "../constants/keys.interface";
import {
	AccountDetails,
	ProfileDetails
} from "../constants/profile.interface";
import { Filter } from "../constants/filters.inteface";

class BackedService {
	private _url: string = 'http://localhost:3002/api/';
	private axios: Axios = new Axios({
		transformResponse: res => JSON.parse(res as unknown as string),
		transitional: {
			silentJSONParsing: false
		},
		responseType: "json",
		baseURL: this._url,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	public async login() {
		await this.axios.post<PublicKey>('login', '');
	}

	public async getProfileDetails(): Promise<AxiosResponse<ProfileDetails>> {
		return await this.axios.post<ProfileDetails>('get-profile-details');
	}

	public async getAccountDetails(id?: string): Promise<AxiosResponse<AccountDetails>> {
		return await this.axios.post<AccountDetails>('get-account-details', id);
	}

	public async getTransaction(filter?: Filter): Promise<AxiosResponse<{id: string}>> {
		return await this.axios.post<{id: string}>('transaction', filter);
	}
}


export default new BackedService();

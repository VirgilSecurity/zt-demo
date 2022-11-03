import { Axios } from "axios";
import {
	AccountDetails,
	ProfileDetails
} from "../constants/profile.interface";
import { Filter } from "../constants/filters.inteface";
import {
	initCrypto,
	KeyPairType,
	VirgilCrypto,
	VirgilPublicKey
} from "virgil-crypto";
import { VirgilKeyPair } from "virgil-crypto/dist/types/types";
import { NodeBuffer } from "@virgilsecurity/data-utils";
import { ChartResponse } from "../constants/charts.interfaces";


class BackedService {
	private _url: string = 'http://' + new URL(window.location.href).host.slice(0, new URL(window.location.href).host.indexOf(':')) + ':3002/api';

	private virgilCrypto: VirgilCrypto;
	private keyPair: VirgilKeyPair;
	private serverPublicKey: VirgilPublicKey;


	private axios: Axios = new Axios({
		//transformResponse: res => JSON.parse(res as unknown as string),
		transformRequest: req => JSON.stringify(req),
		transitional: {
			silentJSONParsing: false
		},
		responseType: "json",
		baseURL: this._url,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	constructor() {
		console.log(this._url);
		this.createCryptoInstance()
			.then(() => console.log('Successfully Initialize Crypto Module'));
	}

	private async createCryptoInstance() {
		await initCrypto();
		this.virgilCrypto = new VirgilCrypto({defaultKeyPairType: KeyPairType.ED25519});
		this.keyPair = this.virgilCrypto.generateKeys(KeyPairType.ED25519);
		console.log('Generate client public and private keys', this.keyPair);
	}

	public async login() {
		console.clear();
		console.log('POST /login get public server key request body ->', { key: this.virgilCrypto.exportPublicKey(this.keyPair.publicKey).toString('base64') })
		await this.axios.post<any>('login', { key: this.virgilCrypto.exportPublicKey(this.keyPair.publicKey).toString('base64') })
			.then(value => {
				const converted = JSON.parse(value.data);
				console.log('POST /login response server public key', converted.key);
				this.serverPublicKey = this.virgilCrypto.importPublicKey(NodeBuffer.from(converted.key + '', 'base64'));
			});
	}

	public async getProfileDetails(): Promise<ProfileDetails> {
		console.clear();
		return await this.axios.post<any>('get-profile-details')
			.then((value) => {
				const converted = JSON.parse(value.data);
				console.log('POST /get-profile-details no body response data before decrypt ->', '' + converted.data);
				const decryptedBuffer =
					this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
						.toString('utf-8');
				console.log('POST /get-profile-details no body response data after decrypt ->', decryptedBuffer);
				return JSON.parse(decryptedBuffer) as unknown as ProfileDetails;
			});
	}

	public async getAccountDetails(id: string): Promise<AccountDetails> {
		const encryptedId = this.virgilCrypto.signThenEncrypt(id, this.keyPair.privateKey, this.serverPublicKey).toString('base64')
		console.log('POST /get-account-details after encrypt ->', encryptedId);
		return await this.axios.post<string>('get-account-details', {info : encryptedId})
			.then((value) => {
				const converted = JSON.parse(value.data);
				console.log('POST /get-account-details before decrypt ->', converted.data);
				const decryptedBuffer =
					this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
						.toString('utf-8');
				console.log('POST /get-account-details after decrypt ->', decryptedBuffer);
				return JSON.parse(decryptedBuffer) as unknown as AccountDetails;
		});
	}

	public async getTransaction(filter?: Filter): Promise<{id: string} | string> {
		console.clear();
		console.log('POST /transaction request data before encrypt', filter);
		console.log(JSON.stringify(filter));
		const encryptedFilter = this.virgilCrypto.signThenEncrypt(JSON.stringify(filter), this.keyPair.privateKey, this.serverPublicKey).toString('base64')
		console.log('POST /transaction request data after encrypt', encryptedFilter);
		return await this.axios.post<any>('transaction', {info: encryptedFilter}).then((value) => {
			const converted = JSON.parse(value.data);
			console.log('POST /transaction response data before decrypt ->', '' + converted.data);
			const decryptedBuffer =
				this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
					.toString('utf-8');
			if (value.status === 404) {
				console.log('POST /transaction response data after decrypt ->', '' + decryptedBuffer);
				return decryptedBuffer;
			}
			console.log('POST /transaction response data after decrypt ->', '' + decryptedBuffer.toString());
			return JSON.parse(decryptedBuffer) as unknown as {id: string};
		});
	}

	public async getCharts(): Promise<ChartResponse> {
		console.clear()
		return await this.axios.post<any>('charts').then((value) => {
			const converted = JSON.parse(value.data);
			console.log('POST /charts response data before decrypt ->', converted.info);
			const decryptedBuffer =
				this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.info, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
					.toString('utf-8');
			console.log('POST /charts response data after decrypt ->', decryptedBuffer.toString());
			return JSON.parse(decryptedBuffer) as unknown as ChartResponse;
		})
	}
}


export default new BackedService();

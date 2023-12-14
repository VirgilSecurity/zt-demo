import { Axios } from "axios";
import {
	AccountDetails,
	ProfileDetails,
	RegisterInterface,
	Status,
	StatusInterface
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
import {
	fido2Create,
	fido2Get
} from '@ownid/webauthn';


class BackedService {
	private _url: string = 'https://' + new URL(window.location.href).host + ':33433/api';

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
		this.createCryptoInstance()
			.then(() => console.log('Successfully Initialize Crypto Module'));
	}

	private async createCryptoInstance() {
		await initCrypto();
		this.virgilCrypto = new VirgilCrypto({defaultKeyPairType: KeyPairType.ED25519});
		this.keyPair = this.virgilCrypto.generateKeys(KeyPairType.ED25519);
		console.log('Generate client public and private keys', this.keyPair);
	}

	public async register(userName: string) {
		console.clear();
		console.log('POST /register with user ->', {username: userName});
		return this.axios.post<any>('register/start', {username: userName}).then(async (value) => {
			const data = await fido2Create(JSON.parse(value.data).data, userName);
			return this.axios.post<boolean>('register/finish', data).then((value) => {
				return value;
			})
		})
	}

	public async login(userName: string) {
		console.clear();
		console.log('POST /login username send ->', { username: userName });
		return await this.axios.post<any>('login/start', { username: userName }).then(async (value) => {
			const convertData = JSON.parse(value.data);
			const sendKey = this.virgilCrypto.exportPublicKey(this.keyPair.publicKey).toString('base64');
			this.serverPublicKey = this.virgilCrypto.importPublicKey(convertData.data.serverKey);
			convertData.data.challenge = convertData.data.challenge + '_' + sendKey;
			const data = await fido2Get(convertData.data, userName);
			return this.axios.post<boolean>('login/finish', {data}).then((value) => {
				// @ts-ignore
				return value.data.res
			})
		});
	}

	public async getProfileDetails(): Promise<ProfileDetails> {
		console.clear();
		if (!this.serverPublicKey) {
			throw new Error('No server public key');
		}
		return await this.axios.post<any>('get-profile-details')
			.then((value) => {
				const converted = JSON.parse(value.data);
				console.log('POST /get-profile-details no body response data before decrypt ->', '' + converted.data);
				if (!converted.data) {
					throw new Error('Login error, login again pls');
				}
				const decryptedBuffer =
					this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
						.toString('utf-8');
				console.log('POST /get-profile-details no body response data after decrypt ->', decryptedBuffer);
				return JSON.parse(decryptedBuffer) as unknown as ProfileDetails;
			});
	}

	public async getAccountDetails(id: string): Promise<AccountDetails> {
		if (!this.serverPublicKey) {
			throw new Error('No server public key');
		}
		const encryptedId = this.virgilCrypto.signThenEncrypt(id, this.keyPair.privateKey, this.serverPublicKey).toString('base64')
		console.log('POST /get-account-details after encrypt ->', encryptedId);
		return await this.axios.post<string>('get-account-details', {info : encryptedId})
			.then((value) => {
				const converted = JSON.parse(value.data);
				console.log('POST /get-account-details before decrypt ->', converted.data);
				if (!converted.data) {
					throw new Error('Login error, login again pls');
				}
				const decryptedBuffer =
					this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
						.toString('utf-8');
				console.log('POST /get-account-details after decrypt ->', decryptedBuffer);
				return JSON.parse(decryptedBuffer) as unknown as AccountDetails;
		});
	}

	public async getTransaction(filter?: Filter): Promise<{id: string} | string> {
		if (!this.serverPublicKey) {
			throw new Error('No server public key');
		}
		console.clear();
		console.log('POST /transaction request data before encrypt', filter);
		console.log(JSON.stringify(filter));
		const encryptedFilter = this.virgilCrypto.signThenEncrypt(JSON.stringify(filter), this.keyPair.privateKey, this.serverPublicKey).toString('base64')
		console.log('POST /transaction request data after encrypt', encryptedFilter);
		return await this.axios.post<any>('transaction', {data: encryptedFilter}).then((value) => {
			const converted = JSON.parse(value.data);
			if (!converted.data) {
				throw new Error('Login error, login again pls');
			}
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
		if (!this.serverPublicKey) {
			throw new Error('No server public key');
		}
		console.clear()
		return await this.axios.post<any>('charts').then((value) => {
			const converted = JSON.parse(value.data);
			if (!converted.data) {
				throw new Error('Login error, login again pls');
			}
			console.log('POST /charts response data before decrypt ->', converted.data);
			const decryptedBuffer =
				this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
					.toString('utf-8');
			console.log('POST /charts response data after decrypt ->', decryptedBuffer.toString());
			return JSON.parse(decryptedBuffer) as unknown as ChartResponse;
		})
	}

	public async getKycStatus(): Promise<StatusInterface> {
		return await this.axios.post('get-kyc-status').then((value) => {
			const converted = JSON.parse(value.data);
			if (!converted.data) {
				throw new Error('Login error, login again pls');
			}
			console.log('POST /get-kyc-status response data before decrypt ->', converted.data);
			const decryptedBuffer =
				this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
					.toString('utf-8');
			console.log('POST /get-kyc-status response data after decrypt ->', decryptedBuffer);
			return JSON.parse(decryptedBuffer) as unknown as StatusInterface;
		})
	}

	public async registerInKyc(registerData: RegisterInterface): Promise<StatusInterface> {
		console.clear();
		console.log('POST /registerInKyc request data before encrypt', registerData);
		const encryptedData = this.virgilCrypto.signThenEncrypt(JSON.stringify(registerData), this.keyPair.privateKey, this.serverPublicKey).toString('base64')
		return this.axios.post('/kyc', {data: encryptedData}).then((value) => {
			const converted = JSON.parse(value.data);
			if (!converted.status) {
				throw new Error('Login error, login again pls');
			}
			console.log('POST /kyc response data before decrypt ->', converted.status);
			const decryptedBuffer =
				this.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.status, 'base64'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey])
					.toString('utf-8');
			console.log('POST /kyc response data after decrypt ->', decryptedBuffer.toString());
			return JSON.parse(decryptedBuffer) as unknown as StatusInterface;
		})
	}
}


export default new BackedService();

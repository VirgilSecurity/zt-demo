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


class BackedService {
	private _url: string = 'http://localhost:3002/api/';

	private virgilCrypto: VirgilCrypto;
	private keyPair: VirgilKeyPair;
	private serverPublicKey: VirgilPublicKey;


	private axios: Axios = new Axios({
		transformResponse: res => JSON.parse(res as unknown as string),
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

	public async login() {
		console.log('POST /login get public server key')
		await this.axios.post<any>('login', this.virgilCrypto.exportPublicKey(this.keyPair.publicKey))
			.then(value => {
				this.serverPublicKey = this.virgilCrypto.importPublicKey(NodeBuffer.from(value.data, 'base64'));
				console.log('POST /login response server public key', this.serverPublicKey);
			});
	}

	public async getProfileDetails(): Promise<ProfileDetails> {
		return await this.axios.post<any>('get-profile-details')
			.then((value) => {
				console.log('POST /get-profile-details no body response data before decrypt ->', '' + value.data.data);
				const decryptedBuffer = this.virgilCrypto.decryptThenVerify(NodeBuffer.from(value.data, 'utf-8'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey]);
				console.log('POST /get-profile-details no body response data after decrypt ->', decryptedBuffer.toString());
				return JSON.parse(decryptedBuffer.toString()) as unknown as ProfileDetails;
			});
	}

	public async getAccountDetails(id?: string): Promise<AccountDetails> {
		return await this.axios.post<string>('get-account-details', id)
			.then((value) => {
				const decryptedBuffer = this.virgilCrypto.decryptThenVerify(NodeBuffer.from(value.data, 'utf-8'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey]);
				return JSON.parse(decryptedBuffer.toString()) as unknown as AccountDetails;
		});
	}

	public async getTransaction(filter?: Filter): Promise<{id: string}> {
		console.log('POST /transaction request data before encrypt', filter);
		const encryptedFilter = this.virgilCrypto.signThenEncrypt(NodeBuffer.from(JSON.stringify(filter), 'utf-8'), this.keyPair.privateKey, this.serverPublicKey)
		console.log('POST /transaction request data after encrypt', encryptedFilter);
		return await this.axios.post<any>('transaction', encryptedFilter).then((value) => {
			console.log('POST /transaction response data before decrypt ->', '' + value.data.data);
			const decryptedBuffer = this.virgilCrypto.decryptThenVerify(NodeBuffer.from(value.data, 'utf-8'), this.keyPair.privateKey, [this.keyPair.publicKey, this.serverPublicKey]);
			console.log('POST /transaction response data after decrypt ->', '' + decryptedBuffer.toString());
			return JSON.parse(decryptedBuffer.toString()) as unknown as {id: string};
		});
	}
}


export default new BackedService();

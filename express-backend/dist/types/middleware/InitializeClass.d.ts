import { VirgilCrypto } from 'virgil-crypto';
import { Settings } from './components/interfaces.js';
import express from 'express';
import { VirgilPublicKey } from 'virgil-crypto/dist/types/VirgilPublicKey';
export declare class ZtMiddleware {
    private encryptKeys;
    private baseUrl;
    virgilCrypto: VirgilCrypto;
    private frontendPublicKey;
    private loginPath;
    private registerPath;
    private encryptEncoding;
    private storageControl;
    private activeStorage;
    private KYCKey;
    private challenges;
    private prId;
    private origin;
    private users;
    private static initializeCryptoModule;
    constructor(settings: Settings);
    private encrypt;
    private decrypt;
    private setKey;
    private rewriteResponse;
    private postFlow;
    private defaultFlow;
    private getNewChallenge;
    private convertChallenge;
    private loginFlow;
    getKeys: () => {
        backendPrivate: import("virgil-crypto").VirgilPrivateKey;
        backendPublic: VirgilPublicKey;
        KYCPublic: VirgilPublicKey;
        frontendPublic: VirgilPublicKey;
    };
    registerInKyc: () => void;
    zeroTrustMiddleware: (req: express.Request, res: express.Response, next: CallableFunction) => any;
}

export declare function uintToString(a: any): string;
export declare function base64ToUint8Array(str: any): Uint8Array;
export declare function getSavedAuthenticatorData(user: any): {
    credentialID: Uint8Array;
    credentialPublicKey: Uint8Array;
    counter: any;
};
export declare function getRegistrationInfo(registrationInfo: any): {
    credentialID: string;
    credentialPublicKey: string;
    counter: any;
};

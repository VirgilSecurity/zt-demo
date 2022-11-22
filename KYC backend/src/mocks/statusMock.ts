import { StatusInterface } from '../interfaces/status.interface.js';


export const NotVerifyStatus: StatusInterface = {
	status: 'not_verified',
	need_verify: true,
};

export const PendingVerifyStatus: StatusInterface = {
	status: 'KYC pending',
	need_verify: false,
};

export const VerifiedStatus: StatusInterface = {
	status: 'verified',
	need_verify: false,
};

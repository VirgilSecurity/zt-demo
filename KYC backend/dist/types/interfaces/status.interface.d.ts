export interface StatusInterface {
    status: Status;
    need_verify: boolean;
}
export type Status = 'not_verified' | 'verified' | 'KYC pending';

export interface ApplicationChart {
    name: string;
    url: string;
    assignedRules: number;
    status: AppStatus;
}
export declare type Action = 'Allow' | 'Block';
export declare type Os = 'Mac' | 'Windows' | 'Linux';
export declare type AppStatus = 'Green' | 'Yellow' | 'Red';
export interface PolicesChart {
    name: string;
    editDate: string;
    action: Action;
    enabled: boolean;
}
export interface UsersChart {
    username: string;
    fullName: string;
    policy: string;
    lastActive: string;
    devices: number;
}
export interface DevicesChart {
    name: string;
    os: Os;
    tags: string[];
}
export interface TransactionsChart {
    createdDate: string;
    count: number;
}

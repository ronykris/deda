import { Principal } from '@dfinity/principal';

export interface DataRequest {
    id: bigint;
    name: string;
    description: string;
    reward: number;
    creator: Principal;
    tags: string;
}

export interface User {
    id: Principal | null;
    balance: number;
    role: 'User' | 'Validator' | 'Researcher';
}

export interface DataSubmission {
    id: bigint;
    u_id: bigint;
    location: string;
    provider: Principal;
    request_id: bigint;
    verified: boolean;
};
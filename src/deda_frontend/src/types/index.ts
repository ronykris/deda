import { Principal } from '@dfinity/principal';

export interface DataRequest {
    id: bigint;
    description: string;
    reward: bigint;
    creator: Principal;
}

export interface User {
    id: Principal | null;
    balance: number;
    role: 'User' | 'Validator' | 'Researcher';
}
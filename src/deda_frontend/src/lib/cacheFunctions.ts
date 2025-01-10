import * as crypto from 'crypto';
import { User } from '../types';
import { Buffer } from 'buffer';

const STORAGE_KEY = 'user_data';
const ALGORITHM = 'aes-256-cbc';
// const KEY = Buffer.from(import.meta.env.VITE_ENCRYPTION_KEY || '', 'hex');
// const IV = Buffer.from(import.meta.env.VITE_ENCRYPTION_IV || '', 'hex');


// if (KEY.length !== 32 || IV.length !== 16) {
//     throw new Error('Invalid encryption key or IV length');
// }

// function encryptData(data: string): string {
//     const cipher = crypto.createCipheriv(ALGORITHM, new Uint8Array(KEY), new Uint8Array(IV));
//     let encrypted = cipher.update(data, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }

// function decryptData(data: string): string {
//     const decipher = crypto.createDecipheriv(ALGORITHM, new Uint8Array(KEY), new Uint8Array(IV));
//     let decrypted = decipher.update(data, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

export function storeUser(user: User): void {

    const userData = JSON.stringify(user, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
    // const encryptedData = encryptData(userData);
    localStorage.setItem(STORAGE_KEY, userData);

    // retrieveUser();
}

export function retrieveUser(): User | null {
    const encryptedData = localStorage.getItem(STORAGE_KEY);
    if (!encryptedData) {
        return null;
    }

    // const decryptedData = decryptData(encryptedData);

    return JSON.parse(encryptedData, (key, value) =>
        typeof value === 'string' && /^\d+n$/.test(value) ? BigInt(value.slice(0, -1)) : value
    );

}

export const clearUser = () => {
    localStorage.removeItem(STORAGE_KEY);
};
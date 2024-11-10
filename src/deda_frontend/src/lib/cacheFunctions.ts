import * as crypto from 'crypto';
import { User } from '../types';

const STORAGE_KEY = 'user_data';
const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.randomBytes(32); // You should store this key securely
const IV = crypto.randomBytes(16); // Initialization vector

function encryptData(data: string): string {
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptData(data: string): string {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function storeUser(user: User): void {
    const userData = JSON.stringify(user);
    const encryptedData = encryptData(userData);
    localStorage.setItem(STORAGE_KEY, encryptedData);
}

export function retrieveUser(): User | null {
    const encryptedData = localStorage.getItem(STORAGE_KEY);
    if (!encryptedData) {
        return null;
    }
    const decryptedData = decryptData(encryptedData);
    return JSON.parse(decryptedData);
}
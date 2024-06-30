import { atom } from 'recoil';
import { Principal } from '@dfinity/principal';

export const userState = atom({
  key: 'userState',
  default: {
    id: null as Principal | null,
    balance: 0,
    role: 'user' as 'User' | 'Validator' | 'Researcher',
  },
});

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import { Principal } from '@dfinity/principal';
import * as dotenv from 'dotenv';
dotenv.config()

const canisterId = process.env.CANISTER_ID_DEDA_BACKEND as string
console.log(canisterId)

const agent = new HttpAgent();
const backend = Actor.createActor(idlFactory, { agent, canisterId: canisterId });

const Login: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'validator' | 'researcher'>('user');

  const login = async () => {
    setLoading(true);
    const principal = await backend.login(role) as unknown as Principal;
    const balance = await backend.get_balance(principal) as unknown as number;
    setUser({ id: principal, balance, role });
    setLoading(false);
  };

  return (
    <div className="p-4">
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value as 'user' | 'validator' | 'researcher')}
        className="p-2 border rounded mb-2"
      >
        <option value="user">User</option>
        <option value="validator">Validator</option>
        <option value="researcher">Researcher</option>
      </select>
      <button 
        onClick={login} 
        disabled={loading} 
        className="px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {user.id && (
        <div className="mt-4">
          Logged in as: {user.id.toString()} <br />
          Role: {user.role}
        </div>
      )}
    </div>
  );
};

export default Login;

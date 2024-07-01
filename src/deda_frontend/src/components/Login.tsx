import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as deda_backend_idl } from '../../../declarations/deda_backend';
import { Principal } from '@dfinity/principal';
import { initAuthClient, loginWithII } from '../auth/auth';
import { IDL } from '@dfinity/candid';

const canisterId = process.env.CANISTER_ID_DEDA_BACKEND as string;

const agent = new HttpAgent();
const backend = Actor.createActor(deda_backend_idl as any, { agent, canisterId: canisterId });

const Login: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'User' | 'Validator' | 'Researcher'>('User');

  const login = async () => {
    setLoading(true);
    try {
      console.log('Role: ', role);
      const authClient = await initAuthClient();
      const principalStr = await loginWithII(authClient);
      const principal = Principal.fromText(principalStr);
      
      const balance = await backend.get_balance(principal) as unknown as number;
      const result = await backend.login(role);
      console.log(result);
      /*if ('Err' in result) {
        throw new Error(result.Err);
      }*/
      setUser({ id: principal, balance, role });
    } catch (err) {
      console.error('Error logging in:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value as 'User' | 'Validator' | 'Researcher')}
        className="p-2 border rounded mb-2"
      >
        <option value="User">User</option>
        <option value="Validator">Validator</option>
        <option value="Researcher">Researcher</option>
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

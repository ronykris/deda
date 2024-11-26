import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as deda_backend_idl } from '../../../declarations/deda_backend';
import { Principal } from '@dfinity/principal';
import { AuthClient } from '@dfinity/auth-client';
import Header from './Header';
import { storeUser } from '../lib/cacheFunctions';
import { useNavigate } from 'react-router-dom';

const canisterId = process.env.CANISTER_ID_DEDA_BACKEND as string;

const agent = new HttpAgent();
agent.fetchRootKey().catch(err => {
  console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
  console.error(err);
});
const backend = Actor.createActor(deda_backend_idl as any, { agent, canisterId: canisterId });
console.log(backend);

const Login: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'User' | 'Validator' | 'Researcher'>('User');

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      console.log('Role: ', role);
      let authClient = await AuthClient.create({
        idleOptions: {
          idleTimeout: 1000 * 60 * 60
        }
      });
      await authClient.login({
        //identityProvider: `http://127.0.0.1:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`,
        identityProvider: `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`,
        onSuccess: async () => {
          console.log("Login successful");
          const identity = authClient.getIdentity().getPrincipal().toString();
          console.log(identity)
          const principal = Principal.fromText(identity);
          console.log(principal)
          try {
            const balance = (await backend.get_balance(principal)) as unknown as number;
            console.log(balance)

            const result = await backend.login(principal, role);
            console.log(result);
            console.log({ id: principal, balance, role })
            setUser({ id: principal, balance, role });
            storeUser({ id: principal, balance, role });

            navigate('/dashboard'); 

          } catch (e) {
            console.error('Error fetching balance or logging in:', e);
          }

        },
      });
      // if (await authClient.isAuthenticated()) {


      // }
      /*if ('Err' in result) {
        throw new Error(result.Err);
      }*/

    } catch (err) {
      console.error('Error logging in:', err);
    }
    setLoading(false);
  };

  console.log(user.id);

  return (
    <div className='relative px-6 lg:px-8 mx-auto max-w-2xl lg:max-w-7xl'>
      <Header />
      <div className="relative py-16">
        <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
          <div className="blur-[60px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[60px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative">
            <div className="max-w-[500px] mx-auto bg-white shadow-lg rounded-md shadow-pricing px-12 py-16 sm:p-[60px]">
              <div className="flex gap-3 justify-center items-center">
                <h3 className="font-bold text-black text-2xl sm:text-3xl text-center">Sign in to{" "}</h3>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#e8c64a] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] inline text-[30px] font-bold">
                  Deda
                </h1>
              </div>
              <p className="font-medium text-base text-body-color mb-11 text-center">Login to your account.</p>
              <form className='flex flex-col gap-8' onSubmit={(e) => console.log(e)}>
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
                  className="w-full flex items-center justify-center p-3 bg-white hover:bg-gray-100 text-base text-center font-medium text-black border-2 rounded-lg border-[#DEE3F7] mb-6">
                  {loading ? 'Logging in...' : 'Login with Internet Identity'}
                </button>
              </form>
              {/* {user.id && (
                <div className="mt-4">
                  Logged in as: {user.id.toString()} <br />
                  Role: {user.role} <br />
                  Balance: {user.balance.toString()}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

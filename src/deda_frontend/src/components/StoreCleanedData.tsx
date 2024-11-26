import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import * as dotenv from 'dotenv';
//dotenv.config()

const agent = new HttpAgent();
agent.fetchRootKey().catch(err => {
  console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
  console.error(err);
});
const backend = Actor.createActor(idlFactory as any, { agent, canisterId: process.env.CANISTER_ID_DEDA_BACKEND as string });

const StoreCleanedData: React.FC = () => {
  const [requestId, setRequestId] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const storeCleanedData = async () => {
    try {
      await backend.store_cleaned_data(Number(requestId), location);
      setResponse('Cleaned data stored successfully');
    } catch (error) {
      setResponse('Error storing cleaned data');
    }
  };

  return (
    <div className="p-4 rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6">Store Cleaned Data</h2>
      <div className='flex flex-col gap-3'>
        <input
          type="number"
          placeholder="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          className="p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Data Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded mb-2"
        />
        <button onClick={storeCleanedData} className="px-4 py-2 bg-green-500 text-white rounded">
          Store Data
        </button>
      </div>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default StoreCleanedData;

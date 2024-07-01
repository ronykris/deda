import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import * as dotenv from 'dotenv';
//dotenv.config()

const agent = new HttpAgent();
const backend = Actor.createActor(idlFactory as any, { agent, canisterId: process.env.CANISTER_ID_DEDA_BACKEND as string });

const AddDataRequest: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [reward, setReward] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const addDataRequest = async () => {
    try {
      const requestId = await backend.add_data_request(description, BigInt(reward));
      setResponse(`Data request added successfully with ID: ${requestId}`);
    } catch (error) {
      setResponse('Error adding data request');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Data Request</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <input
        type="number"
        placeholder="Reward"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <button onClick={addDataRequest} className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Request
      </button>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default AddDataRequest;

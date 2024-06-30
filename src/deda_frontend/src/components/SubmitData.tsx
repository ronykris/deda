import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';

const agent = new HttpAgent();
const backend = Actor.createActor(idlFactory, { agent, canisterId: 'YOUR_CANISTER_ID' });

const SubmitData: React.FC = () => {
  const [requestId, setRequestId] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const submitData = async () => {
    try {
      const submissionId = await backend.submit_data(Number(requestId), location);
      setResponse(`Data submitted successfully with ID: ${submissionId}`);
    } catch (error) {
      setResponse('Error submitting data');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Data</h2>
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
      <button onClick={submitData} className="px-4 py-2 bg-green-500 text-white rounded">
        Submit
      </button>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default SubmitData;

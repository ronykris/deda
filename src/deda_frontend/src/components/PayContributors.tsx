import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import * as dotenv from 'dotenv';
//dotenv.config()

const agent = new HttpAgent();
const backend = Actor.createActor(idlFactory as any, { agent, canisterId: process.env.CANISTER_ID_DEDA_BACKEND as string });

const PayContributors: React.FC = () => {
  const [submissionId, setSubmissionId] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const payContributors = async () => {
    try {
      await backend.pay_contributors(Number(submissionId)); // pay_contributors function invoked
      setResponse('Contributors paid successfully');
    } catch (error) {
      setResponse('Error paying contributors');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pay Contributors</h2>
      <input
        type="number"
        placeholder="Submission ID"
        value={submissionId}
        onChange={(e) => setSubmissionId(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <button onClick={payContributors} className="px-4 py-2 bg-purple-500 text-white rounded">
        Pay
      </button>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default PayContributors;

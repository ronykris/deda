import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/userState';
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

const VerifyData: React.FC = () => {
  const user = useRecoilValue(userState);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const verifyData = async () => {
    try {
      const principal = user.id;
      const result: any = await backend.verify_data(principal, Number(submissionId));
      if ('Ok' in result) {
        setResponse('Data verified successfully');
      } else {
        setResponse('Error verifying data: ' + result.Err);
      }
    } catch (error) {
      setResponse('Error verifying data');
    }
  };

  return (
    <div className="p-4 rounded-md shadow my-16">
      <h2 className="text-2xl font-bold mb-6">Verify Data</h2>
      <input
        type="number"
        placeholder="Submission ID"
        value={submissionId}
        onChange={(e) => setSubmissionId(e.target.value)}
        className="p-2 border rounded mb-2 mr-4"
      />
      <button onClick={verifyData} className="px-4 py-2 bg-yellow-500 text-white rounded">
        Verify
      </button>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default VerifyData;

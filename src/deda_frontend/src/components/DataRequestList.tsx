import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import { DataRequest } from '../types';

const agent = new HttpAgent();
agent.fetchRootKey().catch(err => {
  console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
  console.error(err);
});
const backend = Actor.createActor(idlFactory as any, { agent, canisterId: process.env.CANISTER_ID_DEDA_BACKEND as string });
console.log(backend)

const DataRequestList: React.FC = () => {
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([]);

  useEffect(() => {
    const fetchDataRequests = async () => {
      const requests = await backend.get_data_requests() as unknown as DataRequest[];
      console.log(requests)
      setDataRequests(requests);
    };

    fetchDataRequests();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Requests</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Request ID</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Reward</th>
          </tr>
        </thead>
        <tbody>
          {dataRequests.map((request) => (
            <tr key={request.id} className="text-left">
              <td className="border border-gray-300 px-4 py-2">{request.id.toString()}</td>
              <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">{request.description}</td>
              <td className="border border-gray-300 px-4 py-2">{request.reward.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataRequestList;

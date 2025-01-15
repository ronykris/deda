import React, { useEffect, useState } from 'react';
import { getBackend } from '../lib/getBackend'

const PayContributors: React.FC = () => {
  const [submissionId, setSubmissionId] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [backend, setBackend] = useState<any>(null);

    useEffect(() => {
        const fetchBackend = async () => {
            try {
                const backend = await getBackend();
                setBackend(backend);
                console.log('Backend: ', backend)
            } catch (error) {
                console.error('Error fetching backend:', error);
            }
        };    
        fetchBackend();
    }, []);

  const payContributors = async () => {
    try {
      
      await backend.pay_contributors(Number(submissionId)); // pay_contributors function invoked
      setResponse('Contributors paid successfully');
    } catch (error) {
      setResponse('Error paying contributors');
    }
  };

  return (
    <div className="p-4 rounded-md shadow my-4 bg-white">
      <h2 className="text-2xl font-semibold mb-6">Pay Contributors</h2>
      <input
        type="number"
        placeholder="Submission ID"
        value={submissionId}
        onChange={(e) => setSubmissionId(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <button onClick={payContributors} className="px-4 py-2 bg-purple-500 text-white rounded ml-4">
        Pay
      </button>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default PayContributors;

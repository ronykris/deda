import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/userState';
import { getBackend } from '../lib/getBackend'


const SubmitData: React.FC = () => {
  const user = useRecoilValue(userState);
  const [requestId, setRequestId] = useState<string>('');
  const [location, setLocation] = useState<string>('');
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

  const submitData = async () => {
    try {
      const principal = user.id;
      const result: any = await backend.submit_data(principal, Number(requestId), location);
      console.log(result)
      if ('Ok' in result) {
        const submissionId = result.Ok;
        console.log(submissionId);
        setResponse(`Data submitted successfully with ID: ${submissionId}`);
      } else if ('Err' in result) {
        setResponse(`Error submitting data: ${result.Err}`);
      }
    } catch (error) {
      setResponse('Error submitting data');
      console.error(error);
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

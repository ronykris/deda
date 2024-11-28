import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useRecoilValue } from 'recoil';
import { userState } from '../state/userState';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import React, { useState } from 'react';
import { Principal } from "@dfinity/principal";

const agent = new HttpAgent();
agent.fetchRootKey().catch(err => {
  console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
  console.error(err);
});
const backend = Actor.createActor(idlFactory as any, { agent, canisterId: process.env.CANISTER_ID_DEDA_BACKEND as string });

interface DataSubmission {
  id: string;
  request_id: string;
  location: string;
  provider: Principal;
  verifier?: Principal;
  verified: boolean;
}

function SubmitDataNew() {

  const user = useRecoilValue(userState);
  const [requestId, setRequestId] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [myDataSubmissions, setMyDataSubmissions] = useState<DataSubmission[]>([]);

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
      console.log(error);
      setResponse('Error submitting data');
    }
  };

  const getMyDataSubmissions = async () => {
    try {
      const submissions = await backend.get_my_submissions();
      // setMyDataSubmissions(submissions);
      console.log(submissions);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-4 py-16">
      <Card className="bg-white bg-opacity-50 border-none items-center flex flex-col m-auto py-6">
        <CardHeader>
          <CardTitle className="text-2xl">Submit Data</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col w-full mt-6">
          <Input
            type="number"
            placeholder="Request ID"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            className="p-2 border rounded mb-2 max-w-4/5"
          />
          <Input
            type="text"
            placeholder="Data Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded mb-2 max-w-4/5"
          />
          <Button onClick={submitData} className="px-4 py-2 bg-[#F05B24] text-white rounded m-auto w-full mt-5">
            Submit
          </Button>
          {response && <div className="mt-4">{response}</div>}
        </CardContent>
      </Card>
      {response && <div className="mt-4 rounded-md shadow-sm p-4">{response}</div>}
      <Card className="bg-white bg-opacity-50 border-none">
        <CardHeader>
          <CardTitle>Your Previous Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {myDataSubmissions.map((request: DataSubmission) => {
              return (
                <div className="border-b-2 shadow border-black rounded-sm p-2">
                  <div className="text-lg font-semibold mb-4">{request.request_id}</div>
                  <div>
                    <span className="text-base text-gray-700 mr-4">Location: {request.location}</span>
                    <span className="text-base text-gray-700">Verified: {request.verified}</span>
                  </div>
                </div>
              )
            })}
          </ul>
          <Button onClick={getMyDataSubmissions} className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors mt-4">
            Get Previous Submissions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default SubmitDataNew;
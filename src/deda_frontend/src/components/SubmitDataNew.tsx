import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useRecoilValue } from 'recoil';
import { userState } from '../state/userState';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import React, { useEffect, useState } from 'react';
import { Principal } from "@dfinity/principal";
import { RefreshCw } from "lucide-react"
import { DataRequest } from "../types";
import UploadDataCard from "./uploadDataCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"


const agent = new HttpAgent({ host: `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_DEDA_FRONTEND}` });
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
  const [allDataRequests, setAllDataRequests] = useState<DataRequest[]>([]);
  const [loadingDataRequest, setLoadingDataRequest] = useState<boolean>(false)
  const [loadingDataSubmission, setLoadingDataSubmission] = useState<boolean>(false)
  const [allDataSubmission, setAllDataSubmission] = useState<DataSubmission[]>([])

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
      setLoadingDataSubmission(true)
      const submissions = await backend.get_my_submissions();
      setMyDataSubmissions(submissions as DataSubmission[]);
      console.log("Updated my submissions: ", submissions);
      setLoadingDataSubmission(false)
    } catch (error) {
      console.error(error);
      setLoadingDataSubmission(false)
    }
  }

  const getDataRequests = async () => {
    try {
      setLoadingDataRequest(true)
      const dataRequests = await backend.get_data_requests();
      setAllDataRequests(dataRequests as DataRequest[]);
      console.log(dataRequests);
      setLoadingDataRequest(false)
    } catch (error) {
      console.error(error);
      setLoadingDataRequest(false)
    }
  }

  const getDataSubmissions = async () => {
    try {
      const submissions: DataSubmission[] = await backend.get_submissions() as DataSubmission[];
      setAllDataSubmission(submissions)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMyDataSubmissions();
    getDataRequests();
    getDataSubmissions();
  }, []);

  return (
    <div className="space-y-4 py-12">
      <div className="rounded-xl h-20 border-2 mb-4 border-neutral-50 bg-[#fff5e8] bg-opacity-50 shadow-md flex justify-around items-center">
        <div className="w-1/3 px-[2.5%] lg:px-[5%]">
          <p className="text-lg text-black font-bold">{allDataRequests.length}</p>
          <dfn>Total Data Requests</dfn>
        </div>
        <hr dir="vertical" className="h-4/5 w-[2px] bg-slate-400/30" />
        <div className="w-1/3 px-[2.5%] lg:px-[5%]">
          <p className="text-lg text-black font-bold">{allDataRequests.length - allDataSubmission.length}</p>
          <dfn>Unfulfilled Data Requests</dfn>
        </div>
        <hr dir="vertical" className="h-4/5 w-[2px] bg-slate-400/30" />
        <div className="w-1/3 px-[2.5%] lg:px-[5%]">
          <p className="text-lg text-black font-bold">{myDataSubmissions.length}</p>
          <dfn>Your Data Submission</dfn>
        </div>
      </div>
      <Tabs defaultValue="account" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account" className="data-[state=active]:text-[#F05B24]">Account</TabsTrigger>
          <TabsTrigger value="password" className="data-[state=active]:text-[#F05B24]">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="bg-[#fff5e8] bg-opacity-50 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                <span>Data Requests</span>
                <Button onClick={getDataRequests} className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors p-1 h-6 ml-2">
                  <RefreshCw size={20} className={`${loadingDataRequest ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
              <CardDescription>
                Submit data for request and get rewarded.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {allDataRequests.toReversed().map((request: DataRequest) => {
                  return (
                    <UploadDataCard request={request} key={request.id} />
                  )
                })}
              </ul>
            </CardContent>
          </Card>
          {response && <div className="mt-4 rounded-md shadow-sm p-4">{response}</div>}
        </TabsContent>
        <TabsContent value="password">
          <Card className="bg-[#fff5e8] bg-opacity-50 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                <span>Your Previous Submissions</span>
                <Button onClick={getMyDataSubmissions} className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors p-1 h-6 ml-2">
                  <RefreshCw size={20} className={`${loadingDataSubmission ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
              <CardDescription>
                Your previous submission for data requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {myDataSubmissions.map((request: DataSubmission) => {
                  return (
                    <div key={request.id} className="border-b-2 shadow border-black rounded-sm p-2">
                      {/*<div className="text-lg font-semibold mb-4">{request.request_id}</div>*/}
                      <div>
                        <span className="text-base text-gray-700 mr-4">Request ID: {request.request_id.toString()}</span>
                        <span className="text-base text-gray-700 mr-4">{request.location}</span>
                        <span className="text-base text-gray-700">Verified: {request.verified}</span>
                      </div>
                    </div>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SubmitDataNew;
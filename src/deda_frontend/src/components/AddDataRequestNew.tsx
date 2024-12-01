import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import { Principal } from "@dfinity/principal";
import { RefreshCw } from "lucide-react";

const agent = new HttpAgent();
agent.fetchRootKey().catch(err => {
    console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
    console.error(err);
});
const backend = Actor.createActor(idlFactory as any, { agent, canisterId: process.env.CANISTER_ID_DEDA_BACKEND as string });

interface DataRequest {
    id: string;
    description: string;
    reward: number;
    creator: Principal;
}

function ResearcherDashboard() {

    const [description, setDescription] = useState<string>('');
    const [reward, setReward] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [myDataRequests, setMyDataRequests] = useState<DataRequest[]>([]);
    const [loadingDataRequest, setLoadingDataRequest] = useState<boolean>(false)

    const addDataRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const requestId = await backend.add_data_request(description, BigInt(reward));
            console.log(requestId);
            setResponse(`Data request added successfully with ID: ${requestId}`);
        } catch (error) {
            console.error(error)
            setResponse('Error adding data request');
        }
    };

    const getMyDataRequests = async () => {
        try {
            setLoadingDataRequest(true)
            const requests = await backend.get_my_data_requests();
            setMyDataRequests(requests as DataRequest[]);
            console.log(requests);
            setLoadingDataRequest(false)
        } catch (error) {
            console.error(error);
            setLoadingDataRequest(false)
        }
    }

    useEffect(() => {
        getMyDataRequests();
    }, []); 

    return (
        <div className="space-y-4 py-16">
            <Card className="bg-[#fff5e8] bg-opacity-50 border-none">
                <CardHeader>
                    <CardTitle>Request New Dataset</CardTitle>
                    <CardDescription>
                        Specify your data requirements and set a reward
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4 bg-grey">
                        {/* <Input
              placeholder="Dataset Title"
              className="bg-grey bg-opacity-10 border-none"
            /> */}
                        <Textarea
                            placeholder="Description"
                            className="bg-grey bg-opacity-10 border-none"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input
                            placeholder="Reward Amount (ICP)"
                            type="number"
                            className="bg-grey bg-opacity-10 border-none"
                            onChange={(e) => setReward(e.target.value)}
                        />
                        <Button onClick={addDataRequest} className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors">
                            Submit Request
                        </Button>
                    </form>
                </CardContent>
            </Card>
            {response && <div className="mt-4 rounded-md shadow-sm p-4">{response}</div>}
            <Card className="bg-[#fff5e8] bg-opacity-50 border-none">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">
                        <span>Your Previous Requests</span>
                        <Button onClick={getMyDataRequests} className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors p-1 h-6 ml-2">
                            <RefreshCw size={20} className={`${loadingDataRequest ? 'animate-spin' : ''}`} />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {myDataRequests.map((request: DataRequest) => {
                            return (
                                <div key={request.id} className="border-b-2 shadow border-black rounded-sm p-2">
                                    <div className="text-lg font-semibold mb-4">{request.description}</div>
                                    <div>
                                        <span className="text-base text-gray-700 mr-4">Request ID: {Number(request.id)}</span>
                                        <span className="text-base text-gray-700">Reward: {Number(request.reward)} ICP</span>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

export default ResearcherDashboard;
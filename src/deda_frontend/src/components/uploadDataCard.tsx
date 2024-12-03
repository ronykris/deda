import React, { useCallback, useState } from 'react';
import { DataRequest } from "../types";
import { UploadIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "./ui/dialog"
import { useDropzone } from 'react-dropzone';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as deda_backend_idl } from '../../../declarations/deda_backend';
import { AuthClient } from "@dfinity/auth-client";

const canisterId = process.env.CANISTER_ID_DEDA_BACKEND as string;

const agent = new HttpAgent({host: "http://127.0.0.1:4943"});
agent.fetchRootKey().catch(err => {
    console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
    console.error(err);
});
const backend = Actor.createActor(deda_backend_idl as any, { agent, canisterId: canisterId });
console.log(backend);

const getCurrentPrincipal = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
        const identity = await authClient.getIdentity();
        const principal = identity.getPrincipal();
        return principal;
    } else {
        console.log("User is not authenticated");
        return null;
    }
}

const UploadDataCard: React.FC<{ request: DataRequest }> = ({ request }) => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleUpload = () => {
        if (file) {
            // Handle file upload logic here
            console.log(`Uploading file: ${file.name}`);
            const reader = new FileReader()
            reader.onload = async(e) => {
                const content = e.target?.result as string
                const formattedData = parseCsvToVecFormat(content)
                console.log(`File content: ${formattedData}`)
                const currentPrincipal = (await getCurrentPrincipal())!
                console.log('Current principal: ', currentPrincipal)
                console.log('Submitting Data...')
                const subId = await backend.submit_data(request.id, formattedData)
                console.log('Submission ID: ', subId)
            }
            reader.readAsText(file)
        }
    };

    const parseCsvToVecFormat = (csvContent: string): string[] => {
        const lines = csvContent.trim().split("\n");
        const formattedLines = lines.map((line) => `"${line.trim()}"`);
        //return `${formattedLines.join(", ")}`;
        return formattedLines;
    };

    return (
        <div key={request.id} className="border-b-2 shadow border-black rounded-sm p-2 bg-white">
            <div className="text-lg font-semibold mb-4">{request.description}</div>
            <div>
                <span className="text-base text-gray-700 mr-4">Request ID: {Number(request.id)}</span>
                <span className="text-base text-gray-700">Reward: {Number(request.reward)} ICP</span>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors mt-4" >Submit Data</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Submit Data</DialogTitle>
                        <DialogDescription>
                            Submit data for the request with ID {Number(request.id)}
                        </DialogDescription>
                    </DialogHeader>
                    <div
                        {...getRootProps()}
                        className={`mt-2 p-4 border-2 border-dashed rounded-md cursor-pointer ${isDragActive ? 'border-blue-500' : 'border-gray-300'
                            }`}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="text-center text-blue-500">Drop the files here ...</p>
                        ) : (
                            <p className="text-center text-gray-500">
                                Drag 'n' drop some files here, or click to select files
                                <UploadIcon size={16} className="inline-block ml-2 mb-1" />
                            </p>
                        )}
                    </div>
                    {file && (
                        <div className="flex items-center flex-col justify-center">
                            <p>Selected file: {file.name}</p>
                            <button
                                onClick={handleUpload}
                                className="mt-2 bg-[#F05B24] hover:bg-[#28AAE2] transition-colors text-white py-1 px-3 rounded-md"
                            >
                                Upload File
                            </button>
                        </div>
                    )}
                    <DialogClose asChild>
                        <DialogFooter>
                            <Button>Done</Button>
                        </DialogFooter>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UploadDataCard;
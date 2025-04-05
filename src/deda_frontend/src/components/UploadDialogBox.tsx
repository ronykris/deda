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
import React, { useCallback, useEffect, useState } from 'react';
import { getBackend } from '../lib/getBackend'
import { UploadIcon } from "lucide-react"
import { Button } from "./ui/button"
import { AuthClient } from "@dfinity/auth-client";
import { LoaderCircle } from "lucide-react"
import { DataRequest, DataSubmission } from "../types";

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

export const UploadDialogBox: React.FC<{ requestId: bigint }> = ({ requestId }) => {

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [submissionId, setSubmissionId] = useState<unknown | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [backend, setBackend] = useState<any>(null);

    useEffect(() => {
        const fetchBackend = async () => {
            try {
                const backend = await getBackend();
                setBackend(backend);
            } catch (error) {
                console.error('Error fetching backend:', error);
            }
        };
        fetchBackend();
    }, []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': [] }
    });

    const handleUpload = () => {

        try {
            if (file) {
                setLoading(true);
                // Handle file upload logic here
                console.log(`Uploading file: ${file.name}`);
                const reader = new FileReader()
                reader.onload = async (e) => {
                    const content = e.target?.result as string
                    const formattedData = parseCsvToVecFormat(content)
                    console.log(`File content: ${formattedData}`)
                    const currentPrincipal = (await getCurrentPrincipal())!
                    console.log('Current principal: ', currentPrincipal)
                    console.log('Submitting Data...')
                    const subId = await backend.submit_data(requestId, formattedData, file.size)
                    console.log('Submission ID: ', subId)
                    setSubmissionId((subId as { Ok: unknown }).Ok);
                    setLoading(false);
                }
                reader.readAsText(file)

            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const getDataSubmissions = async () => {
        try {
            const submissions: DataSubmission[] = await backend.get_submissions() as DataSubmission[];

            const isRequestIdPresent = submissions.some(submission => submission.request_id === requestId);
            setIsSubmitted(isRequestIdPresent);
        } catch (error) {
            console.error(error);
        }
    }

    const parseCsvToVecFormat = (csvContent: string): string[] => {
        const lines = csvContent.trim().split("\n");
        const formattedLines = lines.map((line) => `"${line.trim()}"`);
        //return `${formattedLines.join(", ")}`;
        return formattedLines;
    };

    useEffect(() => {
        getDataSubmissions();
    }, [submissionId]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {isSubmitted
                    ? <Button disabled={true} className="bg-[#F05B24] text-black transition-colors" >Submitted</Button>
                    : <Button className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors" >Submit Data</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit Data</DialogTitle>
                    <DialogDescription>
                        Submit data for the request with ID {Number(requestId)}
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
                        {submissionId != null && <p>Submission ID: {String(submissionId)}</p>}
                        {submissionId != null &&
                            <button
                                className="mt-2 bg-[#F05B24] hover:bg-[#28AAE2] flex gap-1 transition-colors text-white py-2 px-3 rounded-md"
                                disabled={true}
                            >
                                {submissionId != null && <p>Submitted!!</p>}
                            </button>
                        }
                        {submissionId == null &&
                            <button
                                onClick={handleUpload}
                                className="mt-2 bg-[#F05B24] hover:bg-[#28AAE2] flex gap-1 transition-colors text-white py-2 px-3 rounded-md"
                            >
                                {loading && <LoaderCircle className='animate-spin' />} <span>{loading ? "Uploading..." : "Upload file"}</span>
                            </button>
                        }
                    </div>
                )}
                <DialogClose asChild>
                    <DialogFooter>
                        <Button>Done</Button>
                    </DialogFooter>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

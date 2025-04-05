import React from 'react';
import { DataRequest, DataSubmission } from "../types";
import { UploadDialogBox } from './UploadDialogBox';

const UploadDataCard: React.FC<{ request: DataRequest }> = ({ request }) => {

    return (
        <div key={request.id} className="border-b-2 shadow border-black rounded-sm p-2 bg-white">
            <div className="text-lg font-semibold mb-4">{request.description}</div>
            <div className='mb-4'>
                <span className="text-base text-gray-700 mr-4">Request ID: {Number(request.id)}</span>
                <span className="text-base text-gray-700">Reward: {Number(request.reward)} ICP</span>
            </div>
            <UploadDialogBox requestId={request.id} />
        </div>
    );
};

export default UploadDataCard;
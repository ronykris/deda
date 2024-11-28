import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Login from './Login';
import DataRequestList from './DataRequestList';
import SubmitData from './SubmitData';
import VerifyData from './VerifyData';
import StoreCleanedData from './StoreCleanedData';
import AddDataRequest from './AddDataRequest';
import PayContributors from './PayContributors';
//import './App.css';
import { userState } from '../state/userState';
import SubmitDataNew from './SubmitDataNew';
import Header from './Header';
import AddDataRequestNew from './AddDataRequestNew';

const Dashboard: React.FC = () => {

    const user = useRecoilValue(userState);

    return (
        <main className='bg-[#fffaf3]'>
            <div className='relative px-6 lg:px-8 mx-auto max-w-2xl lg:max-w-7xl '>
                <Header />
                <div className='relative px-6 lg:px-8 mx-auto max-w-2xl z-10'>
                    {user.role === 'Researcher' && <AddDataRequestNew />}
                    {/* <DataRequestList /> */}
                    {user.role === 'User' && <SubmitDataNew />}
                    {user.role === 'Validator' && (
                        <>
                            <VerifyData />
                            <StoreCleanedData />
                        </>
                    )}
                    <PayContributors />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
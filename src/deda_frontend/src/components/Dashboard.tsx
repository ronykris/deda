import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import VerifyData from './VerifyData';
import StoreCleanedData from './StoreCleanedData';
import { userState } from '../state/userState';
import SubmitDataNew from './SubmitDataNew';
import Header from './Header';
import AddDataRequestNew from './AddDataRequestNew';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <main className='bg-[#fffaf3] min-h-screen'>
            <div className='relative px-6 lg:px-8 mx-auto max-w-2xl lg:max-w-7xl '>
                <Header />
                <div className='relative px-6 lg:px-8 mx-auto max-w-3xl z-10'>
                    {user.role === 'Researcher' && <AddDataRequestNew />}
                    {/* <DataRequestList /> */}
                    {user.role === 'User' && <SubmitDataNew />}
                    {user.role === 'Validator' && (
                        <>
                            <VerifyData />
                            <StoreCleanedData />
                        </>
                    )}
                    {/*<PayContributors />*/}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
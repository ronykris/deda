import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Login from './components/Login';
import DataRequestList from './components/DataRequestList';
import SubmitData from './components/SubmitData';
import VerifyData from './components/VerifyData';
import StoreCleanedData from './components/StoreCleanedData';
import AddDataRequest from './components/AddDataRequest';
import PayContributors from './components/PayContributors';
//import './App.css';
import { userState } from './state/userState';

const AppContent: React.FC = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="App p-4">
      <h1 className="text-3xl font-bold mb-6">DApp</h1>
      <Login />
      {user.role === 'Researcher' && <AddDataRequest />}
      <DataRequestList />
      {user.role === 'User' && <SubmitData />}
      {user.role === 'Validator' && (
        <>
          <VerifyData />
          <StoreCleanedData />
        </>
      )}
      <PayContributors />
    </div>
  );
};

const App: React.FC = () => (
  <RecoilRoot>
    <AppContent />
  </RecoilRoot>
);

export default App;

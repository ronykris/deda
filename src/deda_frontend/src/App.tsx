import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PublicListing from './components/PublicListing';

const App: React.FC = () => {

  console.log('hhello App.tsx')

  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/public" element={<PublicListing />} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
};

export default App;

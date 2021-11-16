import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CompleteSignUp from './containers/CompleteSignUp';
import Home from './containers/Home';
import LandingPage from './containers/LandingPage';
import AddChurras from './containers/AddChurras';
import Loader from './components/Loader';
import { useAuth0 } from '@auth0/auth0-react';
import ParticipantFeedback from './containers/ParticipantFeedback';
import SingleChurras from './containers/SingleChurras';
const AppRoutes = () => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  return (
    <Routes>
      <Route
        path="/complete-sign-up"
        element={isAuthenticated ? <CompleteSignUp /> : <LandingPage />}
      />
      <Route
        path="/account/details"
        element={isAuthenticated ? <CompleteSignUp /> : <LandingPage />}
      />
      <Route path="/" element={isAuthenticated ? <Home /> : <LandingPage />} />
      <Route
        path="/churras/add"
        element={isAuthenticated ? <AddChurras /> : <LandingPage />}
      />
      <Route
        path="/churras/:churrasId"
        element={isAuthenticated ? <SingleChurras /> : <LandingPage />}
      />
      <Route
        path="/churras/:churrasId/participants/:participantId"
        element={<ParticipantFeedback />}
      />
      <Route path="/start" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;

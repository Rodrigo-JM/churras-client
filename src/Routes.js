import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CompleteSignUp from './containers/CompleteSignUp';
import Home from './containers/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/complete-sign-up" element={<CompleteSignUp />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;

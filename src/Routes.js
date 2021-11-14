import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CompleteSignUp from './containers/CompleteSignUp';
import Home from './containers/Home';
import AddChurras from './containers/AddChurras';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/complete-sign-up" element={<CompleteSignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="/churras/add" element={<AddChurras />} />
    </Routes>
  );
};

export default AppRoutes;

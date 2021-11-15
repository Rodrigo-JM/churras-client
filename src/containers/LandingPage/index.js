/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Box, Typography } from '@mui/material';
import { LoginButton, LogoutButton } from '../../components/Login';

export default function LadingPage() {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionUser, token } = useSelector((state) => state.session);

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    dispatch(sessionCreators.setToken(token));
  };

  const addAction = () => {
    navigate('/churras/add');
  };

  useEffect(() => {
    if (user) getToken();
  }, [user]);

  useEffect(() => {
    if (token) dispatch(sessionCreators.startLogSessionUser(user));
  }, [token]);

  useEffect(() => {
    const isComplete = (sessionUser) => {
      return sessionUser.contact && sessionUser.name && sessionUser.pixKey;
    };

    if (sessionUser._id && !isComplete(sessionUser)) {
      navigate('/complete-sign-up');
    }
  }, [sessionUser]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <Header />
      <Box>
        <Typography>Entre para prosseguir</Typography>
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </Box>
    </div>
  );
}

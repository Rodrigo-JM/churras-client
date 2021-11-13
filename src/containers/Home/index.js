/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Button } from '@mui/material';
import SearchWithAdd from './SearchWithAdd';

export default function Home() {
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
      <Header
        authButtonComponent={
          isAuthenticated ? <LogoutButton /> : <LoginButton />
        }
      />
      <SearchWithAdd addAction={addAction} />
      <p>user : {JSON.stringify(user)}</p>
      {isAuthenticated && <button onClick={getToken}>Get Token</button>}
      <p>token : {JSON.stringify(token)}</p>
      <p>sessionUser : {JSON.stringify(sessionUser)}</p>
    </div>
  );
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="text"
      color="lightFont"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="text" color="lightFont" onClick={() => logout()}>
      Log Out
    </Button>
  );
};

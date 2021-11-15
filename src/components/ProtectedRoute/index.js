/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import Loader from '../Loader';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component, ...args }) => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sessionUser, token } = useSelector((state) => state.session);
  const getToken = async () => {
    const token = await getAccessTokenSilently();
    dispatch(sessionCreators.setToken(token));
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

  const Provided = (
    <UserProvider user={user} token={token}>
      {component}
    </UserProvider>
  );

  return <Route element={isAuthenticated ? Provided : <Loader />} {...args} />;
};

const UserProvider = ({ user, token, children }) => {
  return user ? (token ? { ...children } : null) : null;
};

export default ProtectedRoute;

/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Box, Button, Typography } from '@mui/material';
import { LogoutButton } from '../../components/Login';
import Loader from '../../components/Loader';

export default function LadingPage() {
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Header />
      <Box
        sx={{
          padding: '1em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            textTransform: 'uppercase',
            textDecorationColor: 'AppWorkspace',
            marginBottom: 3,
            width: '100%',
          }}
        >
          Crie eventos <br />
          Chame seus amigos <br />
          Determine os valores <br />
        </Typography>
        {!isAuthenticated ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={loginWithRedirect}
          >
            ENTRAR
          </Button>
        ) : (
          <LogoutButton variant="contained" />
        )}
        <Typography
          sx={{
            fontSize: 16,
            textDecorationColor: 'AppWorkspace',
            marginTop: 2,
            lineHeight: '1.6em',
          }}
        >
          Seus convidados receberão uma link onde cada um pode ajudar você a
          entender melhor o que precisa para um churras. E você terá o cálculo
          de todos esses valores dentro do seu evento. Se a gurizada é lenta
          você mesmo pode preencher as necessidades e confirmações de presença.
        </Typography>
      </Box>
    </Box>
  );
}

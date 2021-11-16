/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect, useState } from 'react';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

export default function CompleteSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, getAccessTokenSilently, user } = useAuth0();
  const { sessionUser, token, loading } = useSelector((state) => state.session);

  const isUserPage = () => {
    return location.pathname === '/account/details';
  };

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

  const isComplete = (sessionUser) => {
    return sessionUser.contact && sessionUser.name && sessionUser.pixKey;
  };

  useEffect(() => {
    if (isComplete(sessionUser) && !isUserPage()) {
      navigate('/');
    }
  }, [sessionUser]);

  const [name, setName] = useState(sessionUser.name);
  const [contact, setContact] = useState(sessionUser.contact);
  const [pixKey, setPixKey] = useState(sessionUser.pixKey);
  const [isEditing, setEditing] = useState(false);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    setName(sessionUser.name);
    setContact(sessionUser.contact);
    setPixKey(sessionUser.pixKey);
  }, [sessionUser]);

  const updateUserInfo = () => {
    const updatedUser = { ...sessionUser };

    updatedUser.name = name;
    updatedUser.contact = contact;
    updatedUser.pixKey = pixKey;

    if (!isComplete(updatedUser) && !isUserPage()) {
      setWarning('Complete o cadastro antes de confirmar');
      return;
    }

    setEditing(false);
    dispatch(sessionCreators.startLoader('user'));
    dispatch(sessionCreators.startUpdateSessionUser(updatedUser));
  };

  const deleteUser = () => {
    dispatch(sessionCreators.startDeleteSessionUser(sessionUser));
    logout();
  };
  return (
    <div>
      <Header />
      <Box
        sx={{
          padding: '1em 1em',
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          gap={2}
          sx={{ '@media (min-width: 768px)': { width: 768 } }}
        >
          <Grid item xs={12}>
            <Button
              color="darkUi"
              sx={{ fontWeight: 'bold', marginBottom: '1em' }}
              onClick={() => navigate('/')}
            >
              Voltar
            </Button>
            <Typography sx={{ fontSize: 34, fontWeight: 'bold' }}>
              {!isUserPage() ? 'Complete seu cadastro' : 'Dados Pessoais'}
            </Typography>
          </Grid>

          {loading.user ? (
            <Loader />
          ) : (
            <>
              <Grid item xs={12}>
                {!isUserPage() || isEditing ? (
                  <TextField
                    sx={{ width: '100%' }}
                    color="darkUi"
                    label="Nome"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                ) : (
                  <Typography sx={{ fontSize: 18, wordBreak: 'break-all' }}>
                    Nome: {name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {!isUserPage() || isEditing ? (
                  <TextField
                    sx={{ width: '100%' }}
                    color="darkUi"
                    label="Contato (DDD + Número)"
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                    value={contact}
                  />
                ) : (
                  <Typography sx={{ fontSize: 18 }}>
                    Contato: {contact}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {!isUserPage() || isEditing ? (
                  <TextField
                    sx={{ width: '100%' }}
                    color="darkUi"
                    label="Chave Pix"
                    onChange={(e) => {
                      setPixKey(e.target.value);
                    }}
                    value={pixKey}
                  />
                ) : (
                  <Typography sx={{ fontSize: 18 }}>
                    Chave Pix: {pixKey}
                  </Typography>
                )}
              </Grid>

              <Grid
                container
                item
                gap={2}
                xs={12}
                sx={{
                  padding: '1em',
                  '@media (min-width: 768px)': { width: 768 },
                }}
              >
                {warning && (
                  <Typography
                    color="secondary"
                    sx={{
                      letterSpacing: '0.1em',
                      fontWeight: 'bold',
                      marginBottom: '0.5em',
                    }}
                  >
                    {warning}
                  </Typography>
                )}
                {!isUserPage() || isEditing ? (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      sx={{ color: '#ECECEA', width: '100%' }}
                      onClick={() => updateUserInfo()}
                    >
                      Confirmar
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="tertiary"
                      sx={{
                        color: '#ECECEA',
                        width: '100%',
                        marginBottom: '2em',
                      }}
                      onClick={() => setEditing(!isEditing)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ color: '#ECECEA', width: '100%' }}
                      onClick={() => deleteUser()}
                    >
                      Deletar Conta
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ color: '#ECECEA', width: '100%' }}
                    color="secondary"
                    onClick={() => logout()}
                  >
                    Sair
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
}

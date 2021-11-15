/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect, useState } from 'react';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Box, Button, Grid, Step, StepLabel, Stepper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChurrasInfo from './Steps/ChurrasInfo';
import ChurrasParticipants from './Steps/ChurrasParticipants';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../components/Loader';
import ChurrasValues from './Steps/ChurrasValues';

export default function AddChurras() {
  const { user, getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    dispatch(sessionCreators.setToken(token));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    churrasForm,
    session: { sessionUser, token, loading },
  } = useSelector((state) => state);

  const applyLoading = () => {
    return loading.churras;
  };

  const [step, setStep] = useState(0);

  const lastStep = () => {
    return step === steps.length - 1;
  };

  const firstStep = () => {
    return step === 0;
  };

  const steps = ['Churras Info', 'Participants', 'Values'];

  const continueAction = () => {
    if (firstStep()) {
      //create churras
      dispatch(sessionCreators.startLoader('churras'));
      if (churrasForm.user) {
        dispatch(sessionCreators.startUpdateChurras(churrasForm, sessionUser));
      } else {
        dispatch(sessionCreators.startCreateChurras(churrasForm, sessionUser));
      }
      setStep(step + 1);
      return;
    }

    if (lastStep()) {
      dispatch(sessionCreators.startLoader('churras'));
      dispatch(sessionCreators.startConfirmChurras(churrasForm, sessionUser));
      navigate('/');
      return;
    }

    //updateChurras
    dispatch(sessionCreators.startLoader('churras'));
    dispatch(sessionCreators.startUpdateChurras(churrasForm, sessionUser));
    setStep(step + 1);
  };

  const returnAction = () => {
    if (firstStep()) {
      // cancelar churras
      navigate('/');
      return;
    }
    setStep(step - 1);
  };

  useEffect(() => {
    if (user) getToken();
  }, [user]);

  useEffect(() => {
    if (token) dispatch(sessionCreators.startLogSessionUser(user));
  }, [token]);

  const icons = [
    <InfoIcon color={step >= 0 ? 'primary' : 'disabled'} />,
    <GroupIcon color={step >= 1 ? 'primary' : 'disabled'} />,
    <MonetizationOnIcon color={step >= 2 ? 'primary' : 'disabled'} />,
  ];

  const stepsComponents = [
    <ChurrasInfo />,
    <ChurrasParticipants />,
    <ChurrasValues />,
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Header />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 40,
            margin: '2em 0',
            '@media (min-width: 768px)': { width: 768 },
          }}
        >
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '&: text': {
                      fill: '#ECECEA !important',
                    },
                  }}
                >
                  {icons[index]}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {applyLoading() ? <Loader /> : stepsComponents[step]}
        <Grid
          container
          gap={2}
          sx={{ padding: '1em', '@media (min-width: 768px)': { width: 768 } }}
        >
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ color: '#ECECEA', width: '100%' }}
              onClick={continueAction}
            >
              {lastStep() ? 'Confirmar Churras' : 'Continuar'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ color: '#ECECEA', width: '100%' }}
              color="secondary"
              onClick={returnAction}
            >
              {firstStep() ? 'Cancelar' : 'Voltar'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

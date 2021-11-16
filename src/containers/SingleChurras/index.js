/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useEffect, useState } from 'react';
import { Creators as churrasCreators } from '../../store/ducks/churrasForm';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ParticipantsList from '../AddChurras/Steps/ChurrasParticipants/ParticipantList';
import ChurrasHeader from '../../components/ChurrasHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import ChurrasValueExtract from './ValueDetails';

export default function SingleChurras() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { participants } = useSelector((state) => state.churrasForm);

  const { churras: churrasLoader } = useSelector(
    (state) => state.session.loading,
  );

  const {
    singleChurras,
    sessionUser,
    loading: { participantFeedback },
  } = useSelector((state) => state.session);
  const churrasForm = useSelector((state) => state.churrasForm);

  const { date, title, address, description } = singleChurras;

  const addParticipant = () => {
    dispatch(churrasCreators.addParticipant());
  };

  useEffect(() => {
    dispatch(sessionCreators.startGetChurras(params.churrasId));
  }, []);

  const updateAction = () => {
    dispatch(sessionCreators.startLoader('churras'));
    dispatch(sessionCreators.startUpdateChurras(churrasForm, sessionUser));
  };

  const deleteAction = () => {
    dispatch(sessionCreators.startLoader('churras'));
    dispatch(sessionCreators.startDeleteChurras(singleChurras));
    navigate('/');
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header />
      {churrasLoader ? (
        <Loader />
      ) : (
        <Box
          sx={{
            '@media (min-width: 768px)': { width: 768 },
          }}
        >
          <Button
            color="darkUi"
            sx={{ fontWeight: 'bold', marginBottom: '1em', padding: '1.5em' }}
            onClick={() => navigate('/')}
          >
            Voltar
          </Button>
          <ChurrasHeader date={date} address={address} title={title} />
          <ChurrasValueExtract
            churras={singleChurras}
            loading={participantFeedback}
          />
          <Grid
            container
            gap={2}
            sx={{ padding: '1em', '@media (min-width: 768px)': { width: 768 } }}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ color: '#ECECEA', width: '100%' }}
                onClick={addParticipant}
                color="tertiary"
              >
                Adicionar Convidado
              </Button>
            </Grid>
          </Grid>
          <ParticipantsList participants={participants} editMode />
          <Typography sx={{ padding: '2em' }}>
            <Typography sx={{ fontStyle: 'oblique' }}>Descrição</Typography>
            {description ? description : 'Evento sem descrição'}
          </Typography>
          <Grid
            container
            gap={2}
            sx={{ padding: '1em', '@media (min-width: 768px)': { width: 768 } }}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ color: '#ECECEA', width: '100%' }}
                onClick={updateAction}
              >
                Atualizar Informações
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ color: '#ECECEA', width: '100%' }}
                color="secondary"
                onClick={deleteAction}
              >
                Cancelar Churras
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

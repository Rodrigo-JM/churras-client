/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useEffect, useState } from 'react';
import { Creators as churrasCreators } from '../../../../store/ducks/churrasForm';
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
} from '@mui/material';
import ParticipantsList from './ParticipantList';

export default function ChurrasParticipants() {
  const dispatch = useDispatch();
  const { participants } = useSelector((state) => state.churrasForm);

  const addParticipant = () => {
    setWarning(true);
    dispatch(churrasCreators.addParticipant());
  };

  const [warning, setWarning] = useState(false);

  return (
    <Box
      sx={{
        padding: '1em 1em',
        marginTop: '3em',
        '@media (min-width: 768px)': { width: 768 },
      }}
    >
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
      <ParticipantsList participants={participants} warningChange={warning} />
    </Box>
  );
}

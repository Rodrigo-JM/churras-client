/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useEffect, useState } from 'react';
import { calculateValueDeposited } from './utils';

import { Box, Grid, Typography } from '@mui/material';
import { formatCurrency } from '../../AddChurras/Steps/ChurrasValues/utils';
import Loader from '../../../components/Loader';

export default function ChurrasValueExtract({ churras, loading }) {
  const {
    totalParticipants,
    totalFoodParticipants,
    totalDrinkParticipants,
    totalVeganParticipants,
    valueForTotal,
    valueForFood,
    valueForVegan,
    valueForDrink,
    participants,
  } = churras;
  return (
    <Grid sx={{ padding: '1.5em' }} item container xs={12}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={6}>
            <Typography>Convidados: {totalParticipants}</Typography>
            <Typography>
              Carne: {formatCurrency(valueForFood)} ({totalFoodParticipants})
            </Typography>
            <Typography>
              Bebida: {formatCurrency(valueForDrink)}({totalDrinkParticipants})
            </Typography>
            <Typography>
              Veganos: {formatCurrency(valueForVegan)} ({totalVeganParticipants}
              )
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5em',
              }}
            >
              <Typography>Necessário:</Typography>
              <Typography>{formatCurrency(valueForTotal)}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5em',
              }}
            >
              <Typography>Arrecadado:</Typography>
              <Typography>
                {formatCurrency(calculateValueDeposited(participants))}
              </Typography>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
}

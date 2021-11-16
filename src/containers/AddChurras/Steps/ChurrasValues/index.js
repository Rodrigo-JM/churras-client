/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useEffect, useState } from 'react';
import { Creators as churrasCreators } from '../../../../store/ducks/churrasForm';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { getTotalValue, formatCurrency } from './utils';

export default function ChurrasValues() {
  const dispatch = useDispatch();
  const {
    hasVeganOption,
    drink,
    participants,
    valueForDrink,
    valueForFood,
    valueForVegan,
    totalFoodParticipants,
    totalDrinkParticipants,
    totalVeganParticipants,
    totalParticipants,
  } = useSelector((state) => state.churrasForm);

  const [churrasValueForFood, setChurrasValueForFood] = useState(valueForFood);
  const [churrasValueForDrink, setChurrasValueForDrink] =
    useState(valueForDrink);
  const [churrasValueForVegan, setChurrasValueForVegan] =
    useState(valueForVegan);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setChurrasValueForFood(valueForFood);
    setChurrasValueForDrink(valueForDrink);
    setChurrasValueForVegan(valueForVegan);

    setTotal(
      getTotalValue({
        totalFoodParticipants,
        totalDrinkParticipants,
        totalVeganParticipants,
        totalParticipants,
        valueForDrink,
        valueForFood,
        valueForVegan,
      }),
    );
  }, [
    hasVeganOption,
    drink,
    participants,
    valueForDrink,
    valueForFood,
    valueForVegan,
    totalFoodParticipants,
    totalDrinkParticipants,
    totalVeganParticipants,
    totalParticipants,
  ]);

  const changePropOnForm = (prop, value) => {
    dispatch(churrasCreators.setChurrasProperty(prop, value));
  };

  return (
    <Box
      sx={{
        marginTop: '3em',
        '@media (min-width: 768px)': { width: 768 },
        background: '#FFFFFF',
      }}
    >
      <Grid container gap={1}>
        <Grid container gap={4} item xs={12}>
          <Grid container item sx={{ justifyContent: 'center' }} xs={12}>
            <Grid item xs={5}>
              <TextField
                sx={{ width: '100%' }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                color="darkUi"
                label="Valor Carne (p/ convidado)"
                type="number"
                onChange={(e) => {
                  changePropOnForm('valueForFood', e.target.value);
                }}
                value={churrasValueForFood}
                size="small"
              />
              <FormHelperText sx={{ width: '100%' }} size="small">
                Valores numéricos. Vírgula como separador decimal, não inserir
                ponto.
              </FormHelperText>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography
                component="h2"
                sx={{ textAlign: 'center', textAnchor: 'middle' }}
              >
                {formatCurrency(churrasValueForFood * totalFoodParticipants)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: 'center' }} item xs={12}>
            <Grid item xs={5}>
              <TextField
                sx={{ width: '100%' }}
                color="darkUi"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                label="Valor Bebida (p/ convidado)"
                type="number"
                onChange={(e) => {
                  changePropOnForm('valueForDrink', e.target.value);
                }}
                value={churrasValueForDrink}
                size="small"
              />
              <FormHelperText sx={{ width: '100%' }} size="small">
                Valores numéricos. Vírgula como separador decimal, não inserir
                ponto.
              </FormHelperText>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography>
                {formatCurrency(churrasValueForDrink * totalDrinkParticipants)}
              </Typography>
            </Grid>
          </Grid>
          {hasVeganOption && (
            <Grid container item sx={{ justifyContent: 'center' }} xs={12}>
              <Grid item xs={5}>
                <TextField
                  sx={{ width: '100%' }}
                  color="darkUi"
                  label="Valor Vegan (p/ convidado)"
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  onChange={(e) => {
                    changePropOnForm('valueForVegan', e.target.value * 1);
                  }}
                  value={churrasValueForVegan}
                  size="small"
                />
                <FormHelperText sx={{ width: '100%' }} size="small">
                  Valores numéricos. Vírgula como separador decimal, não inserir
                  ponto.
                </FormHelperText>
              </Grid>
              <Grid
                item
                xs={5}
                sx={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Typography>
                  {formatCurrency(
                    churrasValueForVegan * totalVeganParticipants,
                  )}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid
          container
          sx={{ padding: '2em', alignItems: 'center' }}
          item
          xs={12}
        >
          <Grid item xs={6}>
            <Typography>Total: {totalParticipants}</Typography>
            <Typography>Carne: {totalFoodParticipants}</Typography>
            <Typography>Bebida: {totalDrinkParticipants}</Typography>
            <Typography>Veganos: {totalVeganParticipants}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              borderRadius: '50%',
              background: '#C88CE3',
              height: '120px',
              width: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              filter: 'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2))',
            }}
          >
            <Typography
              sx={{ margin: '1em', fontWeight: 'bold' }}
              textAlign="center"
            >
              Total
            </Typography>
            <Typography
              sx={{ margin: '1em', fontWeight: 'bold' }}
              textAlign="center"
            >
              {formatCurrency(total)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Typography
        color="darkUi"
        sx={{ padding: '2em', letterSpacing: '0.2em' }}
      >
        Ao clicar em confirmar, seus convidados serão notificados. Convidados
        adicionados depois não serão notificados
      </Typography>
    </Box>
  );
}

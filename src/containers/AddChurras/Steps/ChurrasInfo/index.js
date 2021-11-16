/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useEffect, useState } from 'react';
import { Creators as churrasCreators } from '../../../../store/ducks/churrasForm';
import { useSelector, useDispatch } from 'react-redux';
import { isValid } from 'date-fns';

import {
  Box,
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
  Tooltip,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function ChurrasInfo() {
  const dispatch = useDispatch();
  const {
    hasVeganOption,
    date,
    drink,
    defineValueForParticipants,
    usePixKey,
    title,
    description,
    address,
  } = useSelector((state) => state.churrasForm);

  const [churrasTitle, setChurrasTitle] = useState(title);
  const [churrasAddress, setChurrasAddress] = useState(address);
  const [churrasDate, setChurrasDate] = useState(date);
  const [churrasHasVeganOption, setHasVeganOptions] = useState(hasVeganOption);
  const [churrasDrink, setChurrasDrink] = useState(drink);
  const [churrasDefineValueForParticipants, setDefineValueForParticipants] =
    useState(defineValueForParticipants);
  const [churrasDescription, setDescription] = useState(description);
  const [churrasUsePixKey, setUsePixKey] = useState(usePixKey);

  useEffect(() => {
    setChurrasTitle(title);
    setChurrasAddress(address);
    setChurrasDate(date);
    setChurrasDrink(drink);
    setHasVeganOptions(hasVeganOption);
    setDefineValueForParticipants(defineValueForParticipants);
    setUsePixKey(usePixKey);
    setDescription(description);
  }, [
    title,
    address,
    date,
    drink,
    hasVeganOption,
    defineValueForParticipants,
    usePixKey,
    description,
  ]);

  const changePropOnForm = (prop, value) => {
    console.log(value);
    dispatch(churrasCreators.setChurrasProperty(prop, value));
  };

  return (
    <Box
      sx={{
        padding: '1em 1em',
        marginTop: '3em',
        '@media (min-width: 768px)': { width: 768 },
        background: '#FFFFFF',
      }}
    >
      <Grid container gap={1}>
        <Grid container gap={2} item xs={12}>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              color="darkUi"
              label="Nome do Churras"
              onChange={(e) => {
                changePropOnForm('title', e.target.value);
              }}
              value={churrasTitle}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              color="darkUi"
              label="Endereço"
              onChange={(e) => {
                changePropOnForm('address', e.target.value);
              }}
              value={churrasAddress}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider
              sx={{ width: '100%' }}
              dateAdapter={AdapterDateFns}
            >
              <DateTimePicker
                sx={{ width: '100%' }}
                renderInput={(props) => (
                  <TextField {...props} sx={{ width: '100%' }} />
                )}
                label="Data"
                color="darkUi"
                size="small"
                value={churrasDate}
                onChange={(newValue) => {
                  if (!isValid(newValue)) {
                    return;
                  }
                  changePropOnForm('date', newValue.toISOString());
                }}
                inputFormat="dd/MM/yyyy hh:mm a"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container gap={1} item xs={12}>
          <Grid item xs={12}>
            <FormGroup size="small">
              <FormControlLabel
                size="small"
                control={
                  <Checkbox
                    value={churrasHasVeganOption}
                    onChange={(e) =>
                      changePropOnForm('hasVeganOption', e.target.checked)
                    }
                    size="small"
                    checked={churrasHasVeganOption}
                  />
                }
                label="Opções Veganas"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Bebida tem que ter né" placement="left-start">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={churrasDrink}
                      onChange={(e) =>
                        changePropOnForm('drink', e.target.checked)
                      }
                      onClick={() => console.log('click')}
                      size="small"
                      checked={churrasDrink}
                      disabled
                    />
                  }
                  size="small"
                  label="Bebidas"
                />
              </FormGroup>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container gap={2} item xs={12}>
          <Grid item xs={12}>
            <FormGroup size="small">
              <FormControlLabel
                control={
                  <Checkbox
                    value={churrasUsePixKey}
                    onChange={(e) =>
                      changePropOnForm('usePixKey', e.target.checked)
                    }
                    size="small"
                    checked={churrasUsePixKey}
                  />
                }
                label="Adicionar minha chave pix"
                size="small"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }} size="small">
              <InputLabel id="selectAutoValue" size="small">
                Definir Valor por Convidado
              </InputLabel>
              <Select
                labelId="selectAutoValue"
                id="selectAutoValue-helper"
                value={churrasDefineValueForParticipants}
                label="Definir Valor por Convidado"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => {
                  changePropOnForm(
                    'defineValueForParticipants',
                    e.target.value,
                  );
                }}
              >
                <MenuItem value={true}>Automático</MenuItem>
                <MenuItem value={false}>Manual</MenuItem>
              </Select>
              <FormHelperText sx={{ width: '100%' }} size="small">
                Valor pode ser definido automaticamente conforme preferências de
                consumo de cada convidado
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              label="Descrição"
              size="small"
              multiline
              rows={4}
              value={churrasDescription}
              onChange={(e) => {
                changePropOnForm('description', e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

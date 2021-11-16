/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { Creators as sessionCreators } from '../../store/ducks/session';
import {
  Creators as churrasCreators,
  participantInitialState,
} from '../../store/ducks/churrasForm';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ChurrasHeader from '../../components/ChurrasHeader';
import { formatCurrency } from '../AddChurras/Steps/ChurrasValues/utils';
import { adjustContributions } from './utils';
import CopyPix from './CopyToClipboardPix';
import Loader from '../../components/Loader';
import SuccessScreen from './SuccessScreen';

export default function ParticipantFeedback() {
  const dispatch = useDispatch();
  const params = useParams();

  const participantIndex = useSelector((state) =>
    state.session.singleChurras.participants.findIndex(
      (participant) => participant._id === params.participantId,
    ),
  );

  const {
    churras: churrasLoader,
    participantFeedback: participantFeedbackLoader,
  } = useSelector((state) => state.session.loading);
  const throttleSetParticipantProperty = useCallback(
    _.throttle((participantIndex, prop, value) => {
      dispatch(
        churrasCreators.setParticipantProperty(participantIndex, prop, value),
      );
    }, 50),
    [],
  );

  const {
    date,
    address,
    title,
    valueForFood,
    valueForDrink,
    valueForVegan,
    pixKey,
  } = useSelector((state) => state.session.singleChurras);

  const participant = useSelector(
    (state) =>
      state.churrasForm.participants.find(
        (participant) => participant._id === params.participantId,
      ) || participantInitialState,
  );

  const {
    error: { participantFeedback },
  } = useSelector((state) => state.session);

  const [sentFeedback, setSentFeeback] = useState(false);

  useEffect(() => {
    if (participantFeedback) setSentFeeback(true);
  }, [participantFeedback]);

  const {
    name,
    contact,
    drink,
    vegan,
    partner,
    partnerVegan,
    partnerDrink,
    contributionValue,
  } = participant;

  useEffect(() => {
    dispatch(sessionCreators.startGetChurras(params.churrasId));
  }, []);

  const [participantName, setParticipantName] = useState(name);
  const [participantContact, setParticipantContact] = useState(contact);
  const [participantDrink, setParticipantDrink] = useState(drink);
  const [participantVegan, setParticipantVegan] = useState(vegan);
  const [participantPartner, setParticipantPartner] = useState(partner);
  const [participantPartnerVegan, setParticipantPartnerVegan] =
    useState(partnerVegan);
  const [participantPartnerDrink, setParticipantPartnerDrink] =
    useState(partnerDrink);
  const [participantContributionValue, setParticipantContributionValue] =
    useState(contributionValue);

  useEffect(() => {
    setParticipantName(name);
    setParticipantContact(contact);
    setParticipantDrink(drink);
    setParticipantVegan(vegan);
    setParticipantPartner(partner);
    setParticipantPartnerVegan(partnerVegan);
    setParticipantPartnerDrink(partnerDrink);
    setParticipantContributionValue(
      adjustContributions({
        valueForFood,
        valueForDrink,
        valueForVegan,
        drink,
        vegan,
        partnerDrink,
        partnerVegan,
        partner,
      }),
    );
  }, [
    name,
    contact,
    drink,
    vegan,
    partner,
    partnerVegan,
    partnerDrink,
    contributionValue,
  ]);

  const changePropOnForm = (prop, value) => {
    throttleSetParticipantProperty(participantIndex, prop, value);
  };

  const submitParticipantFeedback = (status) => {
    participant.status = status;

    dispatch(
      sessionCreators.startSubmitParticipantFeedback(
        participant,
        params.churrasId,
      ),
    );

    setSentFeeback(true);
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
      <Header noAccount />
      {churrasLoader || participantFeedbackLoader ? (
        <Loader />
      ) : sentFeedback ? (
        <SuccessScreen
          name={participantName}
          contact={participantContact}
          contibutionValue={participantContributionValue}
        />
      ) : (
        <>
          <Box
            sx={{ width: '100%', '@media (min-width: 768px)': { width: 768 } }}
          >
            <ChurrasHeader date={date} address={address} title={title} />
            <Grid container sx={{ padding: '0 0 0 1.5em' }}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 20 }}>{participantName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 20 }}>
                  {participantContact}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ padding: '1.5em' }}>
              <Grid item container gap={1} xs={6}>
                <Grid item sx={{ height: 38 }} xs={12}>
                  <FormGroup size="small">
                    <FormControlLabel
                      size="small"
                      control={
                        <Checkbox
                          value={participantVegan}
                          onChange={(e) =>
                            changePropOnForm('vegan', e.target.checked)
                          }
                          size="small"
                          checked={participantVegan}
                        />
                      }
                      label="Vegano(a)"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sx={{ height: 38 }} xs={12}>
                  <FormGroup size="small">
                    <FormControlLabel
                      size="small"
                      control={
                        <Checkbox
                          value={participantDrink}
                          onChange={(e) =>
                            changePropOnForm('drink', e.target.checked)
                          }
                          size="small"
                          checked={participantDrink}
                        />
                      }
                      label="Bebe"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sx={{ height: 38 }} xs={12}>
                  <FormGroup size="small">
                    <FormControlLabel
                      size="small"
                      control={
                        <Checkbox
                          value={participantPartner}
                          onChange={(e) =>
                            changePropOnForm('partner', e.target.checked)
                          }
                          size="small"
                          checked={participantPartner}
                        />
                      }
                      label="Parceiro(a)"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sx={{ height: 38 }} xs={12}>
                  <FormGroup size="small">
                    <FormControlLabel
                      size="small"
                      control={
                        <Checkbox
                          value={participantPartnerDrink}
                          onChange={(e) =>
                            changePropOnForm('partnerDrink', e.target.checked)
                          }
                          size="small"
                          checked={participantPartnerDrink}
                        />
                      }
                      label="Parceiro Bebe"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sx={{ height: 38 }} xs={12}>
                  <FormGroup size="small">
                    <FormControlLabel
                      size="small"
                      control={
                        <Checkbox
                          value={participantPartnerVegan}
                          onChange={(e) =>
                            changePropOnForm('partnerVegan', e.target.checked)
                          }
                          size="small"
                          checked={participantPartnerVegan}
                        />
                      }
                      label="Parceiro Vegano"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid item container xs={6}>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ height: 20 }}>Carne:</Typography>
                    <Typography sx={{ height: 20 }}>
                      {formatCurrency(valueForFood)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ height: 20 }}> Bebida:</Typography>
                    <Typography sx={{ height: 20 }}>
                      {formatCurrency(valueForDrink)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ height: 20 }}>Vegan: </Typography>
                    <Typography sx={{ height: 20 }}>
                      {formatCurrency(valueForVegan)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
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
                      filter:
                        'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2))',
                    }}
                  >
                    <Typography
                      sx={{
                        margin: '1em 0 0 0 ',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                      }}
                      textAlign="center"
                    >
                      Total
                    </Typography>
                    <Typography
                      sx={{
                        margin: '1em 0 1.5em 0',
                        letterSpacing: '0.1em',
                      }}
                      textAlign="center"
                    >
                      {formatCurrency(participantContributionValue)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid container gap={2} sx={{ padding: '1em' }}>
              <Grid item xs={12}>
                <CopyPix pix={pixKey} />
              </Grid>
              <Grid container item xs={12} gap={2} sx={{ marginTop: '1.5em' }}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ color: '#ECECEA', width: '100%' }}
                    onClick={() => submitParticipantFeedback('confirmed')}
                  >
                    VAMO
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ color: '#ECECEA', width: '100%' }}
                    color="tertiary"
                    onClick={() => submitParticipantFeedback('unknown')}
                  >
                    TO PENSANDO
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ color: '#ECECEA', width: '100%' }}
                    color="secondary"
                    onClick={() => submitParticipantFeedback('declined')}
                  >
                    NÃO VAMO
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}

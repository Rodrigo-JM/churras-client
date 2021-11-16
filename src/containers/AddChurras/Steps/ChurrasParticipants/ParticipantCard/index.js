/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { Creators as churrasCreators } from '../../../../../store/ducks/churrasForm';
import { Creators as sessionCreators } from '../../../../../store/ducks/session';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

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
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../../../../components/Loader';

export default function ParticipantCard({
  participantIndex,
  close,
  editMode,
  warningHandler,
}) {
  const dispatch = useDispatch();
  const params = useParams();

  const throttleSetParticipantProperty = useCallback(
    _.throttle((participantIndex, prop, value) => {
      dispatch(
        churrasCreators.setParticipantProperty(participantIndex, prop, value),
      );
    }, 50),
    [],
  );

  const { participantFeedback } = useSelector((state) => state.session.loading);
  const { defineValueForParticipants, hasVeganOption } = useSelector(
    (state) => state.churrasForm,
  );

  const participant = useSelector(
    (state) => state.churrasForm.participants[participantIndex],
  );

  const {
    name,
    contact,
    status,
    confirmedPix,
    drink,
    vegan,
    partner,
    partnerVegan,
    partnerDrink,
    contributionValue,
  } = participant;

  const [participantName, setParticipantName] = useState(name);
  const [participantContact, setParticipantContact] = useState(contact);
  const [participantStatus, setParticipantStatus] = useState(status);
  const [participantConfirmedPix, setParticipantConfirmedPix] =
    useState(confirmedPix);
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
    setParticipantStatus(status);
    setParticipantConfirmedPix(confirmedPix);
    setParticipantDrink(drink);
    setParticipantVegan(vegan);
    setParticipantPartner(partner);
    setParticipantPartnerVegan(partnerVegan);
    setParticipantPartnerDrink(partnerDrink);
    setParticipantContributionValue(contributionValue);
  }, [
    name,
    contact,
    status,
    confirmedPix,
    drink,
    vegan,
    partner,
    partnerVegan,
    partnerDrink,
    contributionValue,
  ]);

  const [confirmEnabled, setConfirmEnabled] = useState(false);

  const changePropOnForm = (prop, value) => {
    setConfirmEnabled(true);

    throttleSetParticipantProperty(participantIndex, prop, value);
  };

  const removeAction = () => {
    close(false);
    dispatch(churrasCreators.removeParticipant(participantIndex));
    warningHandler();
  };

  const submitParticipantFeedback = () => {
    if (!editMode || !params.churrasId) return close(false);

    dispatch(
      sessionCreators.startSubmitParticipantFeedback(
        participant,
        params.churrasId,
      ),
    );
    dispatch(sessionCreators.startLoader('participantFeedback'));
  };

  return (
    <Box>
      {participantFeedback ? (
        <Loader />
      ) : (
        <Grid container gap={1}>
          <Grid item container gap={1} xs={5}>
            <Grid item sx={{ height: 38 }} xs={12}>
              <TextField
                sx={{ width: '100%' }}
                color="darkUi"
                label="Nome"
                onChange={(e) => {
                  changePropOnForm('name', e.target.value);
                }}
                value={participantName}
                size="small"
              />
            </Grid>
            {hasVeganOption && (
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
            )}
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
            {hasVeganOption && (
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
            )}
          </Grid>
          <Grid item container gap={1} xs={6}>
            <Grid item sx={{ height: 38 }} xs={12}>
              <TextField
                sx={{ width: '100%' }}
                color="darkUi"
                label="Contato (DDD + Celular)"
                onChange={(e) => {
                  changePropOnForm('contact', e.target.value);
                }}
                value={participantContact}
                size="small"
              />
            </Grid>
            <Grid item sx={{ height: 38 }} xs={12}>
              <FormGroup size="small">
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox
                      value={
                        participantStatus !== false &&
                        participantStatus !== 'unknown'
                      }
                      onChange={(e) =>
                        changePropOnForm('status', e.target.checked)
                      }
                      size="small"
                      checked={
                        participantStatus !== false &&
                        participantStatus !== 'unknown'
                      }
                    />
                  }
                  label="Confirmado(a)"
                />
              </FormGroup>
            </Grid>
            <Grid item sx={{ height: 38 }} xs={12}>
              <FormGroup size="small">
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox
                      value={participantConfirmedPix}
                      onChange={(e) =>
                        changePropOnForm('confirmedPix', e.target.checked)
                      }
                      size="small"
                      checked={participantConfirmedPix}
                    />
                  }
                  label="Pagou"
                />
              </FormGroup>
            </Grid>
            <Grid item sx={{ height: 38 }} xs={12}>
              {!defineValueForParticipants && (
                <TextField
                  sx={{ width: '100%' }}
                  color="darkUi"
                  label="Valor"
                  onChange={(e) => {
                    changePropOnForm('contributionValue', e.target.value);
                  }}
                  value={participantContributionValue}
                  size="small"
                />
              )}
            </Grid>
            <Grid item container xs={12}>
              <Grid item sx={{ height: 38 }} xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!confirmEnabled}
                  onClick={submitParticipantFeedback}
                >
                  <CheckIcon color="lightFont" />
                </Button>
              </Grid>
              <Grid item sx={{ height: 38 }} xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={removeAction}
                >
                  <DeleteForeverIcon color="#ECECEA" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

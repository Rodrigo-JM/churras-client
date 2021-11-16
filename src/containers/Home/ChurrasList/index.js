/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Creators as sessionCreators } from '../../../store/ducks/session';
import { Creators as churrasCreators } from '../../../store/ducks/churrasForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ChurrasCard from './ChurrasCard';
import AddIcon from '@mui/icons-material/Add';
import Loader from '../../../components/Loader';

export default function ChurrasList({ addAction }) {
  const dispatch = useDispatch();
  const {
    sessionUser,
    token,
    churrasList,
    loading: { singleChurras: singleChurrasLoader },
  } = useSelector((state) => state.session);

  useEffect(() => {
    if (sessionUser._id) {
      dispatch(sessionCreators.startGetChurrasList(sessionUser._id));
      dispatch(churrasCreators.clearChurrasForm());
    }
  }, [sessionUser]);

  return (
    <Box
      sx={{
        padding: '1em 1em',
        marginTop: '3em',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {singleChurrasLoader ? (
        <Loader />
      ) : (
        <Grid
          container
          gap={1}
          sx={{
            width: '100%',
            '@media (min-width: 768px)': { width: 768 },
            justifyContent: 'flex-start',
          }}
        >
          {churrasList.map((churras) => {
            return (
              <Grid xs={5} md={3}>
                <ChurrasCard churras={churras} />
              </Grid>
            );
          })}
          <Grid xs={5} md={3}>
            <Card
              sx={{
                maxWidth: 275,
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                background: '#F7EFFB',
                cursor: 'pointer',
              }}
              onClick={() => addAction()}
            >
              <CardContent sx={{ padding: '0.5em', height: '100%' }}>
                <Grid
                  container
                  sx={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Grid
                    sx={{
                      height: 75,
                      width: 75,
                      background: '#63B0CD',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    item
                  >
                    <AddIcon color="lightFont" sx={{ height: 25 }} />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    xs={12}
                  >
                    <Typography>Add Churras</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

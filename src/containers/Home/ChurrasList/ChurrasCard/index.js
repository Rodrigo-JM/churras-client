/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { convertDate } from './utils';

export default function ChurrasCard({ churras }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 275,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        background: '#F7EFFB',
        cursor: 'pointer',
      }}
      onClick={() => navigate(`/churras/${churras._id}`)}
    >
      <CardContent sx={{ padding: '0.5em', height: '100%' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 18, letterSpacing: '0.2em', fontWeight: 'bold' }}
              gutterBottom
            >
              {convertDate(churras.date)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {churras.title}
            </Typography>
          </Grid>
          <Grid item container sx={{ marginTop: 'auto' }}>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <GroupIcon color="tertiary" />
              <Typography
                sx={{ fontSize: 14, margin: '0 0 0 0.5em' }}
                gutterBottom
              >
                {churras.totalParticipants}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <MonetizationOnIcon color="tertiary" />
              <Typography
                sx={{ fontSize: 14, margin: '0 0 0 0.5em' }}
                gutterBottom
              >
                {churras.valueForTotal}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

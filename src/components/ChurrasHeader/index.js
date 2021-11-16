import { Box, Typography } from '@mui/material';
import { convertDate } from '../../containers/Home/ChurrasList/ChurrasCard/utils';
import React from 'react';

export default function ChurrasHeader({ date, address, title }) {
  return (
    <Box sx={{ height: 100, padding: '1.5em' }}>
      <Typography
        color="darkUi"
        sx={{ fontSize: 22, letterSpacing: '0.4em', fontWeight: 'bold' }}
      >
        {convertDate(date)}
      </Typography>
      <Typography
        color="darkUi"
        sx={{
          fontSize: 18,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 16,
          letterSpacing: '0.09em',
        }}
        color="darkUi"
      >
        {address}
      </Typography>
    </Box>
  );
}

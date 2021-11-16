import { Box, Typography } from '@mui/material';
import React from 'react';
import { formatCurrency } from '../../AddChurras/Steps/ChurrasValues/utils';

export default function SuccessScreen({ name, contact, contibutionValue }) {
  return (
    <Box sx={{ height: 100, padding: '1.5em' }}>
      <Typography
        color="darkUi"
        sx={{ fontSize: 22, letterSpacing: '0.4em', fontWeight: 'bold' }}
      >
        Convite Respondido !!!
      </Typography>
      <Typography
        color="darkUi"
        sx={{ fontSize: 22, letterSpacing: '0.1em', marginTop: '3em' }}
      >
        Entre em contato com {contact} para acertar os valores
      </Typography>
      <Typography
        color="darkUi"
        sx={{
          fontSize: 22,
          letterSpacing: '0.4em',
          fontWeight: 'bold',
          marginTop: '3em',
        }}
      >
        Total de {formatCurrency(contibutionValue)}
      </Typography>
      <Typography
        color="darkUi"
        sx={{
          fontSize: 12,
          marginTop: '3em',
        }}
      >
        Você pode fechar esta janela
      </Typography>
    </Box>
  );
}

/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ParticipantCard from '../ParticipantCard';
import { formatCurrency } from '../../ChurrasValues/utils';

export default function ParticipantsList({
  participants,
  editMode,
  warningChange,
}) {
  const [participantSelected, setParticipantSelected] = useState(false);

  const handleChange = (participantIndex) => (event, isExpanded) => {
    setParticipantSelected(isExpanded ? participantIndex : false);
  };

  const [warning, setWarning] = useState('');

  const handleWarning = () => {
    setWarning(
      'Você realizou mudanças no evento. Clique em atualizar Informações para salvar',
    );
  };
  return (
    <Box
      sx={{
        marginTop: '1.3em',
        padding: '1em',
      }}
    >
      {editMode && warning && (
        <Typography
          color="secondary"
          sx={{
            letterSpacing: '0.1em',
            fontWeight: 'bold',
            marginBottom: '0.5em',
          }}
        >
          {warning}
        </Typography>
      )}
      {participants.map((participant, participantIndex) => {
        return (
          <Accordion
            expanded={participantSelected === participantIndex}
            onChange={handleChange(participantIndex)}
            key={participantIndex}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  width: 50,
                  color: participant.confirmedPix ? 'green' : 'darkUi',
                }}
              >
                {participant.contributionValue && editMode
                  ? formatCurrency(participant.contributionValue)
                  : null}
              </Typography>
              <Typography
                sx={{
                  marginLeft: 5,
                }}
              >
                {participant.name ? participant.name : 'Nome do Convidado'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '8px 8px 16px 16px' }}>
              <ParticipantCard
                close={setParticipantSelected}
                participantIndex={participantIndex}
                warningHandler={handleWarning}
                editMode
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

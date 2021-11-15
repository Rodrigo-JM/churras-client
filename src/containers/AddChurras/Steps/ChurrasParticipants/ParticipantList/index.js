/* eslint-disable react-hooks/exhaustive-deps, no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ParticipantCard from '../ParticipantCard';

export default function ParticipantsList({ participants }) {
  const [participantSelected, setParticipantSelected] = useState(false);

  const handleChange = (participantIndex) => (event, isExpanded) => {
    setParticipantSelected(isExpanded ? participantIndex : false);
  };

  return (
    <Box
      sx={{
        marginTop: '3em',
        '@media (min-width: 768px)': { width: 768 },
      }}
    >
      {participants.map((participant, participantIndex) => {
        return (
          <Accordion
            expanded={participantSelected === participantIndex}
            onChange={handleChange(participantIndex)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {participant.name ? participant.name : 'Nome do Convidado'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '8px 8px 16px 16px' }}>
              <ParticipantCard
                close={setParticipantSelected}
                participantIndex={participantIndex}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

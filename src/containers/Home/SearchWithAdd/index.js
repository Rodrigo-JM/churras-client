import React from 'react';
import { Box, Button, Grid, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export default function SearchWithAdd({ searchAction, addAction }) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1em 0',
      }}
    >
      <Box
        sx={{
          width: '80%',
          height: 40,
          '@media (min-width: 768px)': { width: 768 },
        }}
      >
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <Tooltip title="No futuro talvez, quem sabe">
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{ width: '100%', height: 50, '&:fieldset': { top: -2 } }}
                disabled
              />
            </Tooltip>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
            }}
            xs={2}
          >
            <Button
              variant="contained"
              sx={{ width: '80%', height: 45, padding: '0px', minWidth: 45 }}
              disabled
            >
              <Tooltip title="No futuro talvez, quem sabe">
                <SearchIcon color="lightFont" />
              </Tooltip>
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
            }}
            xs={2}
          >
            <Button
              variant="contained"
              sx={{ width: '80%', height: 45, padding: '0px', minWidth: 45 }}
              onClick={addAction}
            >
              <AddIcon color="lightFont" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

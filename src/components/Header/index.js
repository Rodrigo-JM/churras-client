import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function Header({
  accountButtonComponent,
  authButtonComponent,
}) {
  return (
    <AppBar position="static" color="darkUi">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color="#ECECEA"
          sx={{ flexGrow: 1, letterSpacing: 2, fontStyle: 'italic' }}
        >
          CHURRAS.co
        </Typography>
        {accountButtonComponent}
        {authButtonComponent}
      </Toolbar>
    </AppBar>
  );
}

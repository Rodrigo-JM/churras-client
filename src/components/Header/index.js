import { AppBar, Toolbar, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton, LogoutButton } from '../Login';

export default function Header({ accountButtonComponent }) {
  const { isAuthenticated } = useAuth0();

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
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  );
}

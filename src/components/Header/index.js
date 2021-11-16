import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton, LogoutButton } from '../Login';
import { useNavigate } from 'react-router-dom';

export default function Header({ noAccount }) {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const redirectToAccountDetails = () => {
    navigate('/account/details');
  };

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
        {!noAccount && isAuthenticated ? (
          <Button
            variant="text"
            color="lightFont"
            onClick={redirectToAccountDetails}
          >
            Conta
          </Button>
        ) : null}
        {!noAccount ? (
          isAuthenticated ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

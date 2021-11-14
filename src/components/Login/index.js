import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="text"
      color="lightFont"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="text" color="lightFont" onClick={() => logout()}>
      Log Out
    </Button>
  );
};

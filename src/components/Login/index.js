import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = ({ variant, color }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant={variant ? variant : 'text'}
      color={color ? variant : 'lightFont'}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export const LogoutButton = ({ variant, color }) => {
  const { logout } = useAuth0();

  return (
    <Button
      variant={variant ? variant : 'text'}
      color={color ? variant : 'lightFont'}
      onClick={() => logout()}
    >
      Log Out
    </Button>
  );
};

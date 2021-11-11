import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

export default function Home() {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const [token, setToken] = useState('');

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    setToken(token);
  };

  return (
    <div>
      <h1>CHURRAS APP</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <p>user : {JSON.stringify(user)}</p>
      {isAuthenticated && <button onClick={getToken}>Get Token</button>}
      <p>token : {JSON.stringify(token)}</p>
    </div>
  );
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <button onClick={() => logout()}>Log Out</button>;
};

/* eslint-disable react-hooks/exhaustive-deps, no-console */

import React, { useEffect, useState } from 'react';
import { Creators as sessionCreators } from '../../store/ducks/session';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CompleteSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionUser } = useSelector((state) => state.session);

  const isComplete = (sessionUser) => {
    return sessionUser.contact && sessionUser.name && sessionUser.pixKey;
  };

  useEffect(() => {
    if (isComplete(sessionUser)) {
      navigate('/');
    }
  }, [sessionUser]);

  const [name, setName] = useState(sessionUser.name);
  const [contact, setContact] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [warning, setWarning] = useState('');

  const completeSignUp = () => {
    const updatedUser = { ...sessionUser };

    updatedUser.name = name;
    updatedUser.contact = contact;
    updatedUser.pixKey = pixKey;

    if (!isComplete(updatedUser)) {
      setWarning('Complete o cadastro antes de confirmar');
      return;
    }

    dispatch(sessionCreators.startUpdateSessionUser(updatedUser));
  };

  return (
    <div>
      <h1>Complete seu cadastro</h1>
      <h2 style={{ color: 'red', fontWeight: 'bold' }}>{warning}</h2>
      <label>Nome:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Contato (celular):</label>
      <input value={contact} onChange={(e) => setContact(e.target.value)} />
      <label>Chave Pix:</label>
      <input value={pixKey} onChange={(e) => setPixKey(e.target.value)} />
      <button onClick={() => completeSignUp()}>Confirmar</button>
      <LogoutButton />
    </div>
  );
}

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <button onClick={() => logout()}>Log Out</button>;
};

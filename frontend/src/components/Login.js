import React from 'react';
import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

function Login() {
  const { auth, setAuth } = useAuth();
  return (
    <>
    <Typography variant='h1'>Login page</Typography>
      <Typography variant='p'>{auth?.user}</Typography>
    </>
  );
}

export default Login;
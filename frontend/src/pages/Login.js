import * as React from 'react';
import Container from '@mui/material/Container';
import LoginForm from '../forms/LoginForm';
import Copyright from '../components/Copyright';


export default function Login() {
  return (
    <Container component="main" maxWidth="xs" sx={{maxHeight: '100vh'}}>
      <LoginForm />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
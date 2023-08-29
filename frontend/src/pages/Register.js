import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import RegisterForm from '../forms/RegisterForm';


export default function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <RegisterForm />
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
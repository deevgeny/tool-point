import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoginForm from '../forms/LoginForm';
import Copyright from '../components/Copyright';
import Error from './Error';


export default function Login() {
  const [error, setError] = useState({ status: 0 });
  console.log(error.status)
  return (
    <Container component="main" maxWidth="xs" sx={{ maxHeight: '100vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      {
        error.status === 401 || error.status === 0? 
        <LoginForm error={error} setError={setError} />
          :
        <Typography component="h1" variant="h5">
          Ошибка {error.status} {error.message}
        </Typography>
        }
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
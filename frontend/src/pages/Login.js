import React from 'react';
import { Form, useActionData, json, redirect} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NewLoginForm from '../forms/LoginForm';
import { login } from '../api/authAPI';


export async function action({ request, params }) {
  const data = await request.formData();
  const result = await login({ email: data.get('email'), password: data.get('password') });
  if (result.status === 200) {
    return redirect('/');
  }
  
  if (result.status === 401) {
    return { ok: false };
  }
  
  throw json({}, { status: result.status, statusText: result.statusText });
}


export default function LoginTest() {
  // Use result to give feedback on page that user cred are not correct
  const result = useActionData();

  return (
    <Container component='main' maxWidth='xs' sx={{ maxHeight: '100vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Вход
        </Typography>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Form method='post'>
          <NewLoginForm result={result} />
        </Form>
      </Box>
      {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
    </Container>
  );
}
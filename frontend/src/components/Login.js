import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { replace, useFormik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import useAuthContext from '../hooks/useAuthContext';
import Api from '../services/api';
import * as jose from 'jose';
import Token from '../services/token';

const validationSchema = yup.object({
  email: yup
    .string('Укажите электронную почту')
    .email('Неверный формат электронной почты')
    .required('Обязательное поле'),
  password: yup
    .string('Укажите пароль')
    .min(8, 'Длина пароля должна быть не менее 8 символов')
    .required('Обязательное поле'),
});

function Login() {
  const { setAuth } = useAuthContext();
  const [ error, setError ] = useState({});
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      // remember: false
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  async function handleSubmit(values) {
    const response = await Api.login({email: values.email, password: values.password});
    if (response?.status === 200) {
      const decodedToken= jose.decodeJwt(response.data.access);
      setAuth({
        // access: response.data.access,
        // refresh: response.data.refresh,
        role: decodedToken.role
      });
      Token.updateLocalAccessToken(response.data.access);
      Token.updateLocalRefreshToken(response.data.refresh);
      navigate('/', {replace: true});
    } else if (response?.status === 401) {
      setError({ message: 'Неверный адрес электронной почты или пароль!' });
    } else if (response?.status === 400) {
      setError({ message: 'Не указаны электронная почты или пароль!' });
    } else {
      // Response errors (http)
      console.log('Status code:', response?.status);
      console.log('Message:', response?.statusText);
      // Axios errors (fetch)
      console.log('Type:', response?.name);
      console.log('Message:', response?.message);
      console.log('Code:', response?.code);

    }
    formik.setSubmitting(false)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {
          formik.isSubmitting 
          ? <CircularProgress />
          : <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
        }
        <Typography component='h1' variant='h5'>
          Вход
        </Typography>
        <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Адрес электронной почты'
            name='email'
            autoComplete='email'
            /* autoFocus */
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {/*<FormControlLabel
            label='Запомнить меня'
            control={
              <Checkbox
                value='remember'
                name='remember'
                color='primary'
                checked={formik.values.remember}
                onChange={formik.handleChange}
              />
            }
          />*/}
          {error?.message && <Alert severity="error">{error.message}</Alert>}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='#' variant='body2' component={RouterLink}>
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' variant='body2' component={RouterLink}>
                Регистрация.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
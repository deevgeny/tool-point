import { useEffect, useState } from 'react';
import * as yup from 'yup';
import * as jose from 'jose';
import { useFormik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorDialog from '../../components/ErrorDialog';
import FormAlert from '../../components/FormAlert';
import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';
import TokenService from '../../services/token';
import ApiService from '../../services/api';


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
  const controller = new AbortController();
  const [response, setResponse] = useState({});
  const [message, setMessage] = useState({});
  const { setError } = useError();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  });
  
  async function handleFormSubmit(values) {
    const response = await ApiService.login({
      body: { ...values },
      signal: controller.signal
    });
    setResponse(response);
  }

  useEffect(() => {
    async function getData() {
      if (response?.status === 200) {
        const data = await response.json?.();
        const decodedToken = jose.decodeJwt(data.access);
        setAuth({
          access: data.access,
          refresh: data.refresh,
          role: decodedToken.role
        });
        TokenService.updateAccessToken(data.access);
        TokenService.updateRefreshToken(data.refresh);
        navigate('/', { replace: true });
      } else if (response?.status === 401) {
        setMessage({
          severity: 'error',
          text: 'Неверный адрес электронной почты или пароль!'
        });
      } else if (response?.status === 400) {
        const data = await response?.json?.();
        setMessage({ data });
      } else {
        setError(response);
      }
    }

    getData();

    formik.setSubmitting(false);

    return () => {
      controller.abort();
    }
    
    // eslint-disable-next-line
  }, [response]);

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
          <FormAlert message={message} />
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, display: 'block', marginX: 'auto' }}
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
      <ErrorDialog />
    </Container>
  );
}

export default Login;
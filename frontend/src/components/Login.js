import { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
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
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const LOGIN_URL = '/api/v1/jwt/create';

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
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  async function handleSubmit(values) {
 
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(values));
      console.log(JSON.stringify(response))
      console.log(response.data.access);
      console.log(response.data.refresh);
      setAuth({ access: response.data.access, refresh: response.data.refresh, role: 'user' });
      navigate('/');
    } catch (err) {
      if (!err?.response) {
        // setErrMsg('No server response')
      } else if (err.response?.status === 400) {
        // setErrMst('Missing email or password')
      } else if (err.response?.status === 401) {
        // setErrMsg('Unauthorized');
      } else {
        // other errors
      }
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
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Запомнить меня'
          />
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
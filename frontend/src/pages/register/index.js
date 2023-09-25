import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import ErrorDialog from '../../components/ErrorDialog';
import useError from '../../hooks/useError';
import ApiService from '../../services/api';


const validationSchema = yup.object({
  firstName: yup
    .string('Укажите имя')
    .required('Обязательное поле'),
  lastName: yup
    .string('Укажите фамилию')
    .required('Обязательное поле'),
  email: yup
    .string('Укажите адрес электронной почты')
    .email('Неверный формат адреса электронной почты')
    .required('Обязательное поле'),
  password: yup
    .string('Укажите пароль')
    .required('Обязательное поле')
    .min(8, 'Длина пароля должна быть не менее 8 символов'),
  retypePassword: yup
    .string('Укажите пароль')
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
});


function Register() {
  const controller = new AbortController();
  const [response, setResponse] = useState({});
  const [message, setMessage] = useState({});
  const { setError } = useError();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  });

  async function handleFormSubmit(values) {
    const body = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password
    }
    const response = await ApiService.register({
      body,
      signal: controller.signal
    });
    setResponse(response);
  }

  useEffect(() => {
    async function handleFormSubmitResponse() {
      if (response?.status === 201) {
        setMessage({
          status: 'success',
          text: ['Поздравляем с успешной регистрацией! Через несколько секунд вы будете перенаправлены на страницу авторизации.']
        });
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 5000);
      } else if (response?.status === 400) {
        const data = await response.json?.();
        setMessage({ status: 'error', text: Object.values(data)[0] });
      } else {
        setError(response);
      }
    }

    handleFormSubmitResponse();

    return () => {
      controller.abort();
    };
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
          : <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
        }
        <Typography component='h1' variant='h5'>
          Регистрация
        </Typography>
        <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                /* autoFocus */
                label='Имя'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Фамилия'
                name='lastName'
                autoComplete='family-name'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Адрес электронной почты'
                name='email'
                autoComplete='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Пароль'
                type='password'
                id='password'
                autoComplete='new-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='retypePassword'
                label='Повторитe пароль'
                type='password'
                id='retypePassword'
                autoComplete='retype-password'
                value={formik.values.retypePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
                helperText={formik.touched.retypePassword && formik.errors.retypePassword}
              />
            </Grid>
          </Grid>
          {message?.status && message.text.map((item, id) => <Alert severity={message.status} key={id}>{item}</Alert>)}    
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, display: 'block', marginX: 'auto' }}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2' component={RouterLink}>
                Уже есть аккаунт?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ErrorDialog />
    </Container>
  );
}

export default Register;
import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import Api from '../services/api';
import { useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
  firstName: yup
    .string('Укажите имя')
    .required('Обязательное поле'),
  lastName: yup
    .string('Укажите фамилию')
    .required('Обязательное поле'),
  email: yup
    .string('Укажите электронную почту')
    .email('Неверный формат электронной почты')
    .required('Обязательное поле'),
  password: yup
    .string('Укажите пароль')
    .required('Обязательное поле')
    .min(8, 'Длина пароля должна быть не менее 8 символов'),
  retypePassword: yup
    .string('Укажите пароль')
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], 'Указанный пароль не совпадает')
});


function Register() {
  const [message, setMessage] = useState({});
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
    const response = await Api.register({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password
    });
    if (response?.status === 201) {
      navigate('/', {replace: true});
    } else if (response?.status === 400) {
      setMessage({ status: 'error', text: Object.values(response.data)[0] });
    } else {
      // Response errors (http)
      // console.log('Status code:', response?.status);
      // console.log('Message:', response?.statusText);
      // Axios errors (fetch)
      // console.log('Type:', response?.name);
      // console.log('Message:', response?.message);
      // console.log('Code:', response?.code);
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
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
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
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
    </Container>
  );
}

export default Register;
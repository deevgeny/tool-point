import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
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
import { Link as RouterLink } from 'react-router-dom';


const validationSchema = yup.object({
  email: yup
    .string('Укажите электронную почту')
    .email('Неверный формат электронной почты')
    .required('Электронная почта обязательна'),
  password: yup
    .string('Укажите пароль')
    .min(8, 'Минимальная длина пароля 8 символов')
    .required('Укажите пароль'),
});


function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
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
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Адрес электронной почты"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Запомнить меня"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Забыли пароль?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to={'/register'} variant="body2">
              {"Регистрация."}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default LoginForm;
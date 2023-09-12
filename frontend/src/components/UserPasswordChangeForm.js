import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useAxiosApiFunction, { API } from '../hooks/useAxiosApiFunction';


const validationSchema = yup.object({
  newPassword: yup
    .string('Укажите новый пароль')
    .min(8, 'Длина пароля должна быть не менее 8 символов')
    .required('Обязательное поле'),
  retypeNewPassword: yup
    .string('Повторите новый пароль')
    .min(8, 'Длина пароля должна быть не менее 8 символов')
    .required('Обязательное поле')
    .oneOf([yup.ref('newPassword')], 'Пароли не совпадают'),
});


function UserPasswordChangeForm() {
  const { response, loading, axiosFetch } = useAxiosApiFunction();
  const [message, setMessage] = useState({});
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      retypeNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  });

  function handleFormSubmit(value) {
    const data = {
      new_password: value.newPassword,
      re_password: value.retypeNewPassword
    }
    axiosFetch(API.changePassword, { data });
  }

  useEffect(() => {
    if (response?.status === 200) {
      setMessage({ status: 'success', text: 'Пароль успешно обновлен' });
    }
  }, [response]);

  return (
    <Box
      sx={{
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography component='h3' variant='h5'>
        Сменить пароль
      </Typography>
      <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='newPassword'
          name='newPassword'
          type='password'
          label='Новый пароль'
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='retypeNewPassword'
          name='retypeNewPassword'
          label='Повторить новый пароль'
          type='password'
          value={formik.values.retypeNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.retypeNewPassword && Boolean(formik.errors.retypeNewPassword)}
          helperText={formik.touched.retypeNewPassword && formik.errors.retypeNewPassword}
        />
        {message?.status && <Alert severity={message.status}>{message.text}</Alert>}
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 3, display: 'block', marginX: 'auto' }}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
}

export default UserPasswordChangeForm;
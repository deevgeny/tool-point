import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const validationSchema = yup.object({
  currentPassword: yup
    .string('Укажите текущий пароль')
    .required('Обязательное поле'),
  newPassword: yup
    .string('Укажите новый пароль')
    .min(8, 'Длина пароля должна быть не менее 8 символов')
    .required('Обязательное поле'),
  retypeNewPassword: yup
    .string('Повторите новый пароль')
    .min(8, 'Длина пароля должна быть не менее 8 символов')
    .required('Обязательное поле')
    .oneOf([yup.ref('newPassword')], 'Указанный пароль не совпадает'),
});


function UserPasswordChangeForm() {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      retypeNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => { }
  });

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
          id='currentPassword'
          name='currentPassword'
          type='password'
          label='Текущий пароль'
          /* autoFocus */
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='newPassword'
          name='password'
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
          name='password'
          label='Повторить новый пароль'
          type='password'
          id='retypeNewPassword'
          value={formik.values.retypeNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.retypeNewPassword && Boolean(formik.errors.retypeNewPassword)}
          helperText={formik.touched.retypeNewPassword && formik.errors.retypeNewPassword}
        />
        {/* {message?.status && <Alert severity={message.status}>{message.text}</Alert>} */}
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
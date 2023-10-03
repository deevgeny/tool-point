import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import FormAlert from '../../components/FormAlert';
import PhoneMask from './PhoneMask';
import ApiService from '../../services/api';


const validationSchema = yup.object({
  firstName: yup
    .string('Имя')
    .required('Обязательное поле'),
  middleName: yup
    .string('Отчество'),
  lastName: yup
    .string('Фамилия')
    .required('Обязательное поле'),
  email: yup
    .string('Укажите электронную почту')
    .email('Неверный формат электронной почты')
    .required('Обязательное поле'),
  phone: yup
    .string('Укажите номер телефона')
    .matches(/^\+\d{1}[^\S\r\n\t]\(\d{3}\)[^\S\r\n\t]\d{3}-\d{2}-\d{2}$/, 'Неверный формат номера')
    // regexp match +7 (000) 000-00-00
});


function UserEditForm() {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState({});
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });
 

  async function handleFormSubmit(values) {
    const body = {
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone
    };
    const response = await ApiService.editPersonalData({ body });
    if (response?.status === 200) {
      const data = await response.json();
      // Update user data with new values
      setUserData(data);
      setMessage({ severity: 'success', text: 'Данные успешно обновлены!' })
    } else {
      const data = await response?.json?.();
      setMessage({ data });
    }
    formik.setSubmitting(false);
  }

  
  function tickMarkAdornment() {
    return {
      endAdornment: (
        <InputAdornment
          position="end"
          sx={{ "& .MuiTypography-root": { color: "success.main" } }}
        >
          &#10004;
        </InputAdornment>
      )
    }
  }


  useEffect(() => {
    // Get initial user data on page load
    const controller = new AbortController();
    async function getData() {
      const response = await ApiService.getPersonalData({
        signal: controller.signal
      });
      const data = await response?.json?.();
      setUserData(data);
    }
    
    getData();
    
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    // Update form values with user data
    formik.resetForm({
      values: {
        firstName: userData?.first_name || '',
        middleName: userData?.middle_name || '',
        lastName: userData?.last_name || '',
        email: userData?.email || '',
        phone: userData?.phone || ''
      }
    });

    // eslint-disable-next-line
  }, [userData]);
  

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
      {formik.isSubmitting
        ? <CircularProgress sx={{display: 'block', marginX: 'auto'}} />
        : <Typography component='h3' variant='h5'>
            Редактировать
          </Typography>
      }
      <Box
        component='form'
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          fullWidth
          id='firstName'
          name='firstName'
          label='Имя'
          /* autoFocus */
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          InputProps={{
            ...(formik.initialValues.firstName !== formik.values.firstName && tickMarkAdornment()),
          }}
        />
        <TextField
          margin='normal'
          fullWidth
          id='middleName'
          name='middleName'
          label='Отчество'
          /* autoFocus */
          value={formik.values.middleName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.middleName && Boolean(formik.errors.middleName)}
          helperText={formik.touched.middleName && formik.errors.middleName}
          InputProps={{
            ...(formik.initialValues.middleName !== formik.values.middleName && tickMarkAdornment()),
          }}
        />
        <TextField
          margin='normal'
          fullWidth
          id='lastName'
          name='lastName'
          label='Фамилия'
          /* autoFocus */
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          InputProps={{
            ...(formik.initialValues.lastName !== formik.values.lastName && tickMarkAdornment()),
          }}
        />
        <TextField
          margin='normal'
          fullWidth
          id='email'
          name='email'
          label='Адрес электронной почты'
          /* autoFocus */
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputProps={{
            ...(formik.initialValues.email !== formik.values.email && tickMarkAdornment()),
          }}
        />
        <TextField
          margin='normal'
          fullWidth
          id='phone'
          name='phone'
          label='Номер телефона'
          /* autoFocus */
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          InputProps={{
            ...(formik.initialValues.phone !== formik.values.phone && tickMarkAdornment()),
            inputComponent: PhoneMask,
          }}
        />
        <FormAlert message={message} />
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

export default UserEditForm;
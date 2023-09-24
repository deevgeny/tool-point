import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import PhoneMask from './PhoneMask';
import useAxiosApiFunction, { API } from '../../hooks/useAxiosApiFunction';


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

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
    .matches(/^\+\d{1}[^\S\r\n\t]\(\d{3}\)[^\S\r\n\t]\d{3}\-\d{2}-\d{2}$/, 'Неверный формат номера')
    // regexp match +7 (000) 000-00-00
});


function UserEditForm() {
  const { response, loading, axiosFetch } = useAxiosApiFunction();
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
    onSubmit: handleFormSubmit
  });
  
  function handleFormSubmit(values) {
    const data = {
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone
    };
    axiosFetch(API.editUserInfo, { data, skip: [400] });
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
    axiosFetch(API.currentUserInfo);
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if (!formik.isSubmitting && response?.status === 200) {
      // On component load: fill form with current user data
      formik.initialValues.firstName = response?.data?.first_name || ''
      formik.initialValues.middleName = response?.data?.middle_name || ''
      formik.initialValues.lastName = response?.data?.last_name || ''
      formik.initialValues.email = response?.data?.email || ''
      formik.initialValues.phone = response?.data?.phone || ''
      // Fix double requests effect due to rerendering
      setMessage({}); // Set message to trigger re-render
    } else if (formik.isSubmitting && response?.status === 200) {
      // On successful form submit: update message 
      formik.setSubmitting(false);
      setMessage({ status: 'success', text: 'Данные успешно обновлены' })
    } else if (formik.isSubmitting && response) {
      // On failed form submit: update message
      formik.setSubmitting(false);
      // MOCK ERROR: change when form handler will be implemented
      // console.log(response.data)
      setMessage({ status: 'error', text: 'Ошибка данных' })
    }
    // eslint-disable-next-line
  }, [response]);

/*   function handleFileUpload(event) {
    const file = event.target.files[0]
    console.log(event)
    console.log(file)
  } */
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
        sx={{
          mt: 1,
        }}
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
          {message?.status && <Alert severity={message.status}>{message.text}</Alert>}
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, display: 'block', marginX: 'auto' }}
          >
            Сохранить
          </Button>
{/*         <Box
          component='img'
          display='block'
          src='/images/blank-avatar.png'
          sx={{
            width: '100px',
            height: '100px',
            mx: 'auto'
          }}
        />
      <Button component='label'>
        Загрузить фото
        <input
          id='photo'
          type='file'
          accept='image/*'
          hidden
          onChange={handleFileUpload}
        />
      </Button>
      <Button
        component="label"
        href="#file-upload"
      >
        Upload a file
        <VisuallyHiddenInput type='file' id='file' accept='image/*' />
      </Button>
      <Typography variant='body2'>val</Typography> */}
    </Box>
</Box>
  );
}

export default UserEditForm;
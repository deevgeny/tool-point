import React from 'react';
import {
  Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, Box, Typography, Button
} from '@mui/material';


function UserCard() {
  return (
    <Card>
      <CardHeader title='Мои данные' />
      <CardMedia
        component='img'
        image='/images/blank-avatar.png'
        alt='My avatar'
        sx={{
          width: '100px',
          height: '100px',
          ml: 2,
          borderRadius: 2

        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minHeight: '150px',
        }}>

        <Typography variant='body1'>Имя</Typography>
        <Typography variant='body1'>Отчество</Typography>
        <Typography variant='body1'>Фамилия</Typography>
        <Typography variant='body2' color='text.secondary'>Личная почта</Typography>
        <Typography variant='body2' color='text.secondary'>Личный телефон</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Редактировать</Button>
        <Button size='small'>Сменить пароль</Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
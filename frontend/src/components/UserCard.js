import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useAxiosApiFunction, { API } from '../hooks/useAxiosApiFunction';


function UserCard() {
  const { response, loading, axiosFetch } = useAxiosApiFunction();

  useEffect(() => {
    axiosFetch(API.currentUserInfo);

    // eslint-disable-next-line
  }, []);


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
        <Typography variant='body1'>
          {response?.data ? response.data.first_name : 'Нет данных'}
        </Typography>
        <Typography variant='body1'>
          Отчество
        </Typography>
        <Typography variant='body1'>
          {response?.data ? response.data.last_name : 'Нет данных'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {response?.data ? response.data.email : 'Нет данных'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Телефон
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Редактировать</Button>
        <Button size='small'>Сменить пароль</Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import useAxiosApiFunction, { API } from '../hooks/useAxiosApiFunction';


function UserCard() {
  const { response, loading, axiosFetch } = useAxiosApiFunction();

  useEffect(() => {
    axiosFetch(API.currentUserInfo);

    // eslint-disable-next-line
  }, []);

  return (
    <Card>
      <CardHeader title='Личные данные' />
      <CardMedia
        component='img'
        image={response?.data?.photo
          ? response?.data?.photo
          : '/images/blank-avatar.png'}
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
        }}
      >
        {loading
          ? <CircularProgress />
          : <>
              <Typography variant='body1'>
                {response?.data?.first_name}
              </Typography>
              <Typography variant='body1'>
                {response?.data?.middle_name}
              </Typography>
              <Typography variant='body1'>
                {response?.data?.last_name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {response?.data?.email}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {response?.data?.phone}
              </Typography>
             </>
        }
      </CardContent>
      <CardActions>
        <Button
          size='small'
          to='/account/user'
          component={RouterLink}
        >
          Редактировать
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
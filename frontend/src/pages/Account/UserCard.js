import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import RouterLinkButton from '../../components/RouterLinkButton';
import ApiService from '../../services/api';
import useError from '../../hooks/useError';


function UserCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { setError } = useError();

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      setLoading(true);
      const response = await ApiService.getPersonalData({
        signal: controller.signal
      });
      if (!response.ok && !controller.signal.aborted) {
        setError(response);
        setLoading(false);
      } else {
        const data = await response?.json?.();
        setLoading(false);
        setData(data || {});
      }
    }

    getData();

    return () => {
      controller.abort();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Card>
      <CardHeader title='Личные данные' />
      <CardMedia
        component='img'
        image={data?.photo
          ? data?.photo
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
                {data?.first_name}
              </Typography>
              <Typography variant='body1'>
                {data?.middle_name}
              </Typography>
              <Typography variant='body1'>
                {data?.last_name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {data?.email}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {data?.phone}
              </Typography>
             </>
        }
      </CardContent>
      <CardActions>
        <RouterLinkButton to='/account/user'>
          Редактировать
        </RouterLinkButton>
      </CardActions>
    </Card>
  );
}

export default UserCard;
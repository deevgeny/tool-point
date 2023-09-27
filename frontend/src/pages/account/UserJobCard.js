import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import RouterLinkButton from '../../components/RouterLinkButton';


function UserJobCard() {
  return (
    <Card>
      <CardHeader title='Работа' />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minHeight: '250px',
        }}>
        <Typography variant='body1'>Подразделение</Typography>
        <Typography variant='body1'>Отдел</Typography>
        <Typography variant='body1'>Должность</Typography>
        <Typography variant='body2'>(Данный функционал находится в разработке)</Typography>
      </CardContent>
      <CardActions>
        <RouterLinkButton to='#'>Войти</RouterLinkButton>
      </CardActions>
    </Card>
  );
}

export default UserJobCard;
import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


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
      </CardContent>
      <CardActions>
        <Button size='small'>Войти</Button>
      </CardActions>
    </Card>
  );
}

export default UserJobCard;
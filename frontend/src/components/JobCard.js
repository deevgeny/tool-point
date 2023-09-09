import React from 'react';
import {
  Card, CardHeader, CardContent, CardActions, Box, Typography, Button
} from '@mui/material';


function JobCard() {
  return (
    <Card>
      <CardHeader title='Моя работа' />
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
        <Typography variant='body2' color='text.secondary'>Рабочая почта</Typography>
        <Typography variant='body2' color='text.secondary'>Рабочий телефон</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Войти</Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;
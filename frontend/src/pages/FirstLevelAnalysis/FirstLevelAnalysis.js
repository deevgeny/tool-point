import React from 'react';
import { Typography, Divider, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import RouterBackButton from '../../components/RouterBackButton';
import ProblemList from './ProblemList';


function FirstLevelAnalysis() {
  return (
    <>
      <Grid container spacing={3} my={2}>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant='h6' component='div' align='center'>
                  Сообщить о проблеме
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant='h6' component='div' align='center'>
                  Все отчеты
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Typography variant='h6' align='center'>Мои отчеты</Typography>
      <Divider />
      <ProblemList />
      <RouterBackButton />
    </>
  );
}

export default FirstLevelAnalysis;
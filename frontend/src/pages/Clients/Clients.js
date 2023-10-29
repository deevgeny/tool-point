import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


function Clients() {

  return (
      <Grid
        container
        spacing={3}
        alignItems='center'
        //justifyContent='space-around'
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant='h3'>Клиенты</Typography>
          <Typography variant='body'>Данная страница находится в разработке.</Typography>
        </Grid>
      </Grid>
  );
}

export default Clients;
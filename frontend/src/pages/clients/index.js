import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


function Clients() {
  function handleFileUpload(event) {
    const file = event.target.files[0]
    console.log(event)
    console.log(file)
  }
  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
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
    </Container>
  );
}

export default Clients;
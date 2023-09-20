import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
import UserJobCard from './UserJobCard';

function Account() {
  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid
        container
        spacing={3}
        alignItems='center'
        //justifyContent='space-around'
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <UserCard/>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <UserJobCard/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
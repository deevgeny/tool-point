import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import UserCard from '../components/UserCard';
import JobCard from '../components/JobCard';

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
          <JobCard/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
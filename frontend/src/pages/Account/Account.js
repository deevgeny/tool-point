import React from 'react';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
import UserJobCard from './UserJobCard';
import RouterBackButton from '../../components/RouterBackButton';

function Account() {
  return (
    <>
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
      <RouterBackButton />
    </>
  );
}

export default Account;
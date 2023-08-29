import React from 'react';
import { Typography, Button } from '@mui/material';

function Home() {
  return (
    <>
      <Typography variant='h1'>Home page</Typography>
      <Button onClick={()=>console.log('cliecke')}>Login</Button>
    </>
  );
}

export default Home;
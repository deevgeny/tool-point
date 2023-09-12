import React from 'react';
import Typography from '@mui/material/Typography';

function HomeView() {
  function handleFileUpload(event) {
    const file = event.target.files[0]
    console.log(event)
    console.log(file)
  }
  return (
    <>
      <Typography variant='h1'>Главная</Typography>

    </>
  );
}

export default HomeView;
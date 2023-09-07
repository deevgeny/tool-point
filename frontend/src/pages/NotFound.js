import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function NotFound() {

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    > 
      <Container maxWidth="sx" sx={{ mt: 20, mb: 4 }}>
        <Typography variant='h3' textAlign={'center'}>
          Страница не найдена
        </Typography>
      </Container>
    </Box>
  );
}

export default NotFound;
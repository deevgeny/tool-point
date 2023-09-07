import React from 'react';
import { Typography, Box, Container } from '@mui/material';

function Unauthorized() {
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
          Недостаточно прав доступа
        </Typography>
      </Container>
    </Box>
  );
}

export default Unauthorized;
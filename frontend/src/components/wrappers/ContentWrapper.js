import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';

function ContentWrapper({ children }) {
  // Used to wrap only page content (no Drawer/AppBar e.g. side/top bar )
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
      <Toolbar />
      <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default ContentWrapper;
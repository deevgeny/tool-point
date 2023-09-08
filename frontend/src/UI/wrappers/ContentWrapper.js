import React from 'react';
import Box from '@mui/material/Box';

function ContentWrapper({ children }) {
  // Used to wrap only page content (no Drawer/AppBar e.g. side/top menu )
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
      {children}
    </Box>
  );
}

export default ContentWrapper;
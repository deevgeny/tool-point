import React from 'react';
import Box from '@mui/material/Box';

function ErrorWrapper({ children }) {
  return (
    <Box sx={{ mt: 20, mb: 4 }}>
      {children}
    </Box>
  );
}

export default ErrorWrapper;
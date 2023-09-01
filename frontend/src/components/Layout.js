import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Outlet />
    </Box>
  )
}

export default Layout
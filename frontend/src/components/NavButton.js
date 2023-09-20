import React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';


function NavButton({children, to}) {
  return (
    <Button
      size='small'
      to={to || '#'}
      component={RouterLink}
    >
      {children}
    </Button>
  );
}

export default NavButton;
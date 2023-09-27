import React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';


function RouterLinkButton(props) {
  const { children, ...buttonProps } = props;
  return (
    <Button
      size='small'
      component={RouterLink}
      { ...buttonProps }
    >
      {children}
    </Button>
  );
}

export default RouterLinkButton;
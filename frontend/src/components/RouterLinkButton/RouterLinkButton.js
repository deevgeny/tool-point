import React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

/**
 * React router link button (MUI Button wrapper for react-router-dom Link).
 * 
 * @param {} props - All props from parent element.
 * @param {buttonProps} - Props for MUI Button element (e.g. to='' for router link). 
 * @returns {@mui/material/Button} - MUI Button element.
 */
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
import React from 'react';
import Typography from '@mui/material/Typography';

/**
 * Title component.
 *
 * @param {} props - All props from parent component.
 * @returns {@mui/meterial/Typography} - MUI Typography element.
 */
function Title(props) {
  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {props.children}
    </Typography>
  );
}

export default Title;

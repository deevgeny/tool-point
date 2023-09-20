import React from 'react';
import Typography from '@mui/material/Typography';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import ErrorWrapper from '../../components/wrappers/ErrorWrapper';

function NotFound() {
  // NotFound route
  return (
    <ContentWrapper>
      <ErrorWrapper>
        <Typography variant='h4' textAlign={'center'}>
          Страница не найдена
        </Typography>
    </ErrorWrapper>
  </ContentWrapper>
  );
}

export default NotFound;
import React from 'react';
import Typography from '@mui/material/Typography';
import ContentWrapper from '../UI/wrappers/ContentWrapper';
import ErrorWrapper from '../UI/wrappers/ErrorWrapper';

function NotFoundView() {
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

export default NotFoundView;
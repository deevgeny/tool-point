import React from 'react';
import Typography from '@mui/material/Typography';
import ContentWrapper from '../UI/wrappers/ContentWrapper';
import ErrorWrapper from '../UI/wrappers/ErrorWrapper';

function UnauthorizedView() {
  return (
    <ContentWrapper>
      <ErrorWrapper>
        <Typography variant='h3' textAlign={'center'}>
          Недостаточно прав доступа
        </Typography>
      </ErrorWrapper>
    </ContentWrapper>
  );
}

export default UnauthorizedView;
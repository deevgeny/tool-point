import React from 'react';
import Typography from '@mui/material/Typography';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import ErrorWrapper from '../../components/wrappers/ErrorWrapper';

function Unauthorized() {
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

export default Unauthorized;
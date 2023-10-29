import React from 'react';
import Grid from '@mui/material/Grid';
import ToolCard from './ToolCard';
import RouterBackButton from '../../components/RouterBackButton';
import { toolCards } from '../../utils/constants';

function Tools() {
  return (
    <>
      <Grid
        container
        spacing={3}
        alignItems='center'
      >
        {toolCards.map(tool => 
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <ToolCard tool={{...tool}} />
          </Grid>
        )}
      </Grid>
      <RouterBackButton />
    </>
  );
}

export default Tools;
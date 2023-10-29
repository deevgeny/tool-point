import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Grid } from '@mui/material';

function ProblemItem({ problem }) {
  return (
    <Card>
      <CardActionArea>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Typography variant='body2'>{problem.client}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Typography variant='body2'>{problem.defect}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Typography variant='body2'>{problem.product}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Typography variant='body2'>
                {problem.problem_start_date.replace('T', ' ').slice(0, -6)}
              </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Typography variant='body2'>{problem.status}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Typography variant='body2'>{problem.reported_by}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProblemItem;
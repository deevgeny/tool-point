import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ApiService from '../../services/api';
import useError from '../../hooks/useError';
import ProblemItem from './ProblemItem';

function ProblemList() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { error, setError } = useError();

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      setLoading(true);
      const response = await ApiService.getLineProblems({
        signal: controller.signal
      });
      if (!response.ok) {
        setError(response);
        setLoading(false);
      } else {
        const data = await response?.json?.();
        setLoading(false);
        setData(data || {});
      }
    }

    getData();

    // eslint-disable-next-line
  }, [])

  return (
    <Grid
      container
      spacing={3}
      alignItems='center'
      my={1}
    >
      {
        data.count
          ? data.results.map(problem =>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ProblemItem problem={problem} />
              </Grid>         
            )
          : <Typography variant='h6' component='div' align='center'>
              У вас пока нет отчетов
            </Typography>
      }

    </Grid>
  );
}

export default ProblemList;

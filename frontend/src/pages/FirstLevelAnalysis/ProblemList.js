import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import ApiService from '../../services/api';
import useError from '../../hooks/useError';
import ProblemItem from './ProblemItem';

function ProblemList() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { setError } = useError();

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      setLoading(true);
      const response = await ApiService.getLineProblems({
        signal: controller.signal
      });
      if (!response.ok && !controller.signal.aborted) {
        setError(response);
        setLoading(false);
      } else {
        const data = await response?.json?.();
        setLoading(false);
        setData(data || {});
      }
    }

    getData();

    return () => {
      controller.abort();
    }

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
        loading
          ? <Grid item xs={12} sm={12} md={12} lg={12} xl={12} textAlign='center'>
              <CircularProgress />
            </Grid>
          : data?.results?.map(problem =>
              <Grid item key={problem.id} xs={12} sm={12} md={12} lg={12} xl={12}>
                <ProblemItem problem={problem} />
              </Grid>         
            )
      }
    </Grid>
  );
}

export default ProblemList;

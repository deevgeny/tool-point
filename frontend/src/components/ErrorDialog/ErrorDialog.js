import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { errorStatusMessage } from '../../utils/constants';
import useError from '../../hooks/useError';


export default function ErrorDialog() {
  const { error, setError } = useError();
  
  function handleClose() {
    // ADD FEATURE: send log to server
    setError({});
  };

  useEffect(() => {
    // Add status to fetch() errors to open error dialog
    if (!error?.status && error?.message) {
      setError({ ...error, status: error.message });
    }
    // eslint-disable-next-line
  }, [error])

  return (
    <Dialog
      open={error?.status ? true : false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Ошибка {error?.status}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errorStatusMessage[error?.status]}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
      </DialogActions>
    </Dialog>
  );
}

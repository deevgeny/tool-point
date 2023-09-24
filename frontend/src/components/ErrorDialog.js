import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useError from '../hooks/useError';


export default function ErrorDialog() {
  const { error, setError } = useError();

  const handleClose = () => {
    // ADD FEATURE: send log to server
    setError({});
  };

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
          {error?.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
      </DialogActions>
    </Dialog>
  );
}

import React from 'react';
import Container from '@mui/material/Container';
import UserPasswordChangeForm from './UserPasswordChangeForm';
import UserEditForm from './UserEditForm';

function UserAccount() {
  return (
    <Container component='main' maxWidth='xs'>
      <UserEditForm />
      <UserPasswordChangeForm />
    </Container>
  );
}

export default UserAccount;
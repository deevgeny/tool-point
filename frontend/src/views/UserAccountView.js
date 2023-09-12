import React from 'react';
import Container from '@mui/material/Container';
import UserPasswordChangeForm from '../components/UserPasswordChangeForm';
import UserEditForm from '../components/UserEditForm';

function UserAccountView() {
  return (
    <Container component='main' maxWidth='xs'>
      <UserEditForm />
      <UserPasswordChangeForm />
    </Container>
  );
}

export default UserAccountView;
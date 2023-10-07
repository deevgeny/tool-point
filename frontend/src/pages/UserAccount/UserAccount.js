import React from 'react';
import Container from '@mui/material/Container';
import UserPasswordChangeForm from './UserPasswordChangeForm';
import UserEditForm from './UserEditForm';
import RouterBackButton from '../../components/RouterBackButton';

function UserAccount() {
  return (
    <Container component='main' maxWidth='xs'>
      <UserEditForm />
      <UserPasswordChangeForm />
    <RouterBackButton />
    </Container>
  );
}

export default UserAccount;
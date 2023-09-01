import React, {useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import Home from '../pages/Home';
import { Navigate, Outlet } from 'react-router-dom';

function EntryPoint() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
    <h1>landing page</h1>
      {isAuthenticated ? <Outlet /> : <Navigate replace to='/login' />}
    </>
  );
}

export default EntryPoint;
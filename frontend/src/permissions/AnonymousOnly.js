import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function AnonymousOnly() {
  const { auth } = useAuthContext();
  const location = useLocation();
  return (
    !auth?.role
      ? <Outlet />
      : <Navigate to='/' state={{ from: location }} replace /> 
  );
}

export default AnonymousOnly;
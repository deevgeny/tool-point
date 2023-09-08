import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function AnonymousOnly() {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    !auth?.role
      ? <Outlet />
      : <Navigate to='/' state={{ from: location }} replace /> 
  );
}

export default AnonymousOnly;
import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from 'react-router-dom';


function AuthorizedOnly({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    allowedRoles.includes(auth?.role)
      ? <Outlet />
      : auth?.role
        ? <Navigate to='/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default AuthorizedOnly;

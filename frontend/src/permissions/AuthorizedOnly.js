import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useLocation, Navigate, Outlet } from 'react-router-dom';


function AuthorizedOnly({ allowedRoles }) {
  const { auth } = useAuthContext();
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

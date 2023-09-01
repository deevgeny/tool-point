import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from 'react-router-dom';


function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth)
  return (
    allowedRoles.includes(auth?.role)
      ? <Outlet />
      : auth?.user
        ? <Navigate to='/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;


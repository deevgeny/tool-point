import React from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';

const ROLES = {
  'User': 'user',
  'Admin': 'admin'
}

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />
      },
      
      // Protected routes
      {
        path: '',
        element: <RequireAuth allowedRoles={[ROLES.User]} />,
        children: [
          {
            path: '',
            element: <Home />
          }
        ]
      }
    ]
  }
];

export default routes;
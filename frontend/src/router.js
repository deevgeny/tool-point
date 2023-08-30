import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from "./pages/Error";
import { action as loginAction } from './pages/Login';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <Home />
  },
]);

export default router;
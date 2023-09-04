import React from 'react';
import { Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import AuthorizedOnly from './permissions/AuthorizedOnly';
import AnonymousOnly from './permissions/AnonymousOnly';

const ROLES = {
  User: 'USER'
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Only for anonymous users */}
        <Route element={<AnonymousOnly />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        
        {/* Protected routes */}
        <Route element={<AuthorizedOnly allowedRoles={[ROLES.User]} />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

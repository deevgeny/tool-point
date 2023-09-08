import React from 'react';
import { Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import UserLayout from './layouts/UserLayout';
import MainLayout from './layouts/MainLayout';
import Home from './routes/Home';
import Account from './routes/Account';
import Login from './routes/Login';
import Register from './routes/Register';
import Unauthorized from './routes/Unauthorized';
import NotFound from './routes/NotFound';
import AuthorizedOnly from './permissions/AuthorizedOnly';
import AnonymousOnly from './permissions/AnonymousOnly';

const ROLES = {
  User: 'USER'
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* Only for anonymous users */}
        <Route element={<AnonymousOnly />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        
        {/* Protected routes */}
        <Route element={<AuthorizedOnly allowedRoles={[ROLES.User]} />}>
          <Route element={<UserLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<Account />} />
          </Route>
        </Route>

        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import {
  Login,
  Register,
  Home,
  Clients,
  Products,
  Stock,
  Stats,
  Tools,
  Account,
  UserAccount,
  NotFound,
  Unauthorized
} from './pages';
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
          <Route element={<DashboardLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/user' element={<UserAccount />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/products' element={<Products />} />
            <Route path='/stock' element={<Stock />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/tools' element={<Tools />} />
          </Route>
        </Route>

        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Stock from './pages/Stock';
import Stats from './pages/Stats';
import Tools from './pages/Tools';
import Account from './pages/Account';
import UserAccount from './pages/UserAccount';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import AuthorizedOnly from './permissions/AuthorizedOnly';
import AnonymousOnly from './permissions/AnonymousOnly';
import FirstLevelAnalysis from './pages/FirstLevelAnalysis';

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
            <Route path='/tools/first-level-analysis' element={<FirstLevelAnalysis />} />
          </Route>
        </Route>

        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

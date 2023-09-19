import React from 'react';
import { Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import HomeView from './views/HomeView';
import AccountView from './views/AccountView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ClientsView from './views/ClientsView';
import ProductsView from './views/ProductsView';
import StockView from './views/StockView';
import StatsView from './views/StatsView';
import ToolsView from './views/ToolsView';
import UnauthorizedView from './views/UnauthorizedView';
import UserAccountView from './views/UserAccountView';
import NotFoundView from './views/NotFoundView';
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
          <Route path='login' element={<LoginView />} />
          <Route path='register' element={<RegisterView />} />
        </Route>
        
        {/* Protected routes */}
        <Route element={<AuthorizedOnly allowedRoles={[ROLES.User]} />}>
          <Route element={<HomeLayout />}>
            <Route path='/' element={<HomeView />} />
            <Route path='/account' element={<AccountView />} />
            <Route path='/account/user' element={<UserAccountView />} />
            <Route path='/clients' element={<ClientsView />} />
            <Route path='/products' element={<ProductsView />} />
            <Route path='/stock' element={<StockView />} />
            <Route path='/stats' element={<StatsView />} />
            <Route path='/tools' element={<ToolsView />} />
          </Route>
        </Route>

        <Route path='unauthorized' element={<UnauthorizedView />} />
        <Route path='*' element={<NotFoundView />} />
      </Route>
    </Routes>
  );
}

export default App;

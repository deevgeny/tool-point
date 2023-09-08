import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import ContentWrapper from '../UI/wrappers/ContentWrapper';
import { Outlet } from 'react-router-dom';
import ErrorDialog from '../components/ErrorDialog';


function UserLayout() {
  const [open, setOpen] = useState(true);
  
  function toggleDrawer() {
    setOpen(!open);
  }
  
  return (
    <>
      <TopBar open={open} toggleDrawer={toggleDrawer} />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
      <ContentWrapper>
        <Toolbar />
        <Outlet />
        <ErrorDialog />
      </ContentWrapper>
    </>
  );
}

export default UserLayout;
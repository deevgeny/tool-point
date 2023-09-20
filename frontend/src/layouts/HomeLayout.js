import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import SideBar from './SideBar';
import TopBar from './TopBar';
import ContentWrapper from '../components/wrappers/ContentWrapper';
import { Outlet } from 'react-router-dom';
import ErrorDialog from './ErrorDialog';


function HomeLayout() {
  const [open, setOpen] = useState(false);
  
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

export default HomeLayout;
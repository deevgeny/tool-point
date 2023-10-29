import { useState } from 'react';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import ContentWrapper from '../components/wrappers/ContentWrapper';
import { Outlet } from 'react-router-dom';
import ErrorDialog from '../components/ErrorDialog';


function DashboardLayout() {
  const [open, setOpen] = useState(false);
  
  function toggleDrawer() {
    setOpen(!open);
  }
  
  return (
    <>
      <TopBar open={open} toggleDrawer={toggleDrawer} />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
      <ContentWrapper>
        <Outlet />
        <ErrorDialog />
      </ContentWrapper>
    </>
  );
}

export default DashboardLayout;
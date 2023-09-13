import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import HandymanIcon from '@mui/icons-material/Handyman';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LayersIcon from '@mui/icons-material/Layers';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { secondaryListItems } from './listItems';
import { drawerWidth } from '../utils/constants'; 


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function SideBar({ open, toggleDrawer }) {
  const [placement, setPlacement] = useState('right');
  const navigate = useNavigate();

  useEffect(() => {
    open ? setPlacement('top') : setPlacement('right')
  },[open]) 

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
          </IconButton>
          </Toolbar>
        <Divider />
      <List component="nav">
        <ListItemButton onClick={() => navigate('/')}>
          <Tooltip title='Главная' placement={placement}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Главная" />
        </ListItemButton>
        <ListItemButton>
          <Tooltip title='Клиенты' placement={placement}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Клиенты" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Продукты" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <WarehouseIcon />
          </ListItemIcon>
          <ListItemText primary="Склад" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Статистика" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <HandymanIcon />
          </ListItemIcon>
          <ListItemText primary="Инструменты" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </Drawer>
  );
}

export default SideBar;
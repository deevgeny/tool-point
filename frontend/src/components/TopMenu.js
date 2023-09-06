import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountMenuButton from './AccountMenuButton';
import Token from '../services/token';
import useAuthContext from '../hooks/useAuthContext';
import axiosInstance from '../api/axiosApi';
import useAxiosFunction from '../hooks/useAxiosFunction';
import { Avatar, CircularProgress, Icon, Tooltip } from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


function TopMenu({ open, toggleDrawer }) {
  const [user, error, loading, axiosFetch] = useAxiosFunction();
  const { setAuth } = useAuthContext();
  
  function handleLogout() {
    Token.clear();
    setAuth({});
  }

  useEffect(() => {
    axiosFetch({
      axiosInstance,
      method: 'GET',
      url: '/users/me'
    });

  }, []);

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <Tooltip title='Мой аккаунт'>
          <IconButton color='inherit' size='small'>
            <Avatar>
              {user?.first_name && `${user?.first_name[0]}${user?.last_name[0]}`}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Tooltip title='Выход'>
          <IconButton
            color='inherit'
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default TopMenu;
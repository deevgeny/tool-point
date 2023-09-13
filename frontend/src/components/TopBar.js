import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Token from '../services/token';
import useAuthContext from '../hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosApiFunction, { API } from '../hooks/useAxiosApiFunction';
import { get_page_title } from '../utils/title';
import { drawerWidth } from '../utils/constants';


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


function TopBar({ open, toggleDrawer }) {
  const { response, axiosFetch } = useAxiosApiFunction();
  const { setAuth } = useAuthContext();
  const [pageTitle, setPageTitle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  
  function handleLogout() {
    Token.clear();
    setAuth({});
  }

  function handleAccount() {
    navigate('/account');

  }

  useEffect(() => {
    axiosFetch(API.currentUserInfo);
    
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPageTitle(get_page_title(pathname));
  }, [pathname])


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
          {pageTitle}
        </Typography>
        <Tooltip title='Мой аккаунт'>
          <IconButton color='inherit' size='small' onClick={handleAccount}>
            <Avatar>
              {
                response?.data?.first_name
                  ? `${response?.data?.first_name[0]}${response?.data?.last_name[0]}`
                  : <NoAccountsIcon />
              }
            </Avatar>
          </IconButton>
        </Tooltip>
        <Tooltip title='Выход'>
          <IconButton
            color='inherit'
            onClick={handleLogout}
            sx={{
              minHeight: 50,
              minWidth: 50
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar;
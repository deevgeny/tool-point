import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import useAuthContext from '../../hooks/useAuth';
import ApiService from '../../services/api';
import TokenService from '../../services/token';
import { get_page_title } from '../../utils/title';
import { drawerWidth } from '../../utils/constants';


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
  const [data, setData] = useState({});
  const [pageTitle, setPageTitle] = useState('');
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  
  function handleLogout() {
    TokenService.clear();
    setAuth({});
  }

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      const response = await ApiService.getPersonalData({
        signal: controller.signal
      });
      const data = await response?.json?.();
      setData(data || {});
    }

    getData();
    
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Change page title in TopBar
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
          <IconButton
            color='inherit'
            size='small'
            onClick={() => { navigate('/account') }}
          >
            <Avatar>
              {
                data?.first_name
                  ? `${data?.first_name[0]}${data?.last_name[0]}`
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
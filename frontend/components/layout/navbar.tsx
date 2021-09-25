import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MoreIcon from '@material-ui/icons/MoreVert';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  Box,
} from '@material-ui/core';
import { Context as UserContext } from '../../context/user';
import api from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      marginBottom: '4rem',
    },

    toolbar: {
      padding: '0 4rem',
      [theme.breakpoints.down('sm')]: {
        padding: '0 1rem',
      },
    },

    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        alignItems: 'center',
        '& button': {
          marginLeft: '15px',
        },
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

export default function Navbar() {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await router.push('/');
      await api.get('/api/auth/logout');
    } catch (err) {
      console.log('logout error', err);
    }
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {state.user && state.user.type.includes('superAdmin') && (
        <MenuItem style={{ padding: '0 10px' }} onClick={handleMenuClose}>
          <Link href='/admin'>
            <Button variant='text' color='secondary' size='small'>
              Welcome Admin
            </Button>
          </Link>
        </MenuItem>
      )}
      <MenuItem style={{ padding: '0 10px' }} onClick={handleMenuClose}>
        <Button variant='text' color='secondary' size='small'>
          <Link href='/dashboard'>Dashboard</Link>
        </Button>
      </MenuItem>
      <Box onClick={handleLogout}>
        <MenuItem style={{ padding: '0 10px' }} onClick={handleMenuClose}>
          <Button variant='text' color='secondary' size='small'>
            Logout
          </Button>
        </MenuItem>
      </Box>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {state.user && state.user.type === 'superAdmin' && (
        <MenuItem>
          <Link href='/admin'>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <SupervisorAccountIcon />
              <Typography style={{ marginLeft: '10px' }}>
                Welcome Admin
              </Typography>
            </IconButton>
          </Link>
        </MenuItem>
      )}

      {state.user ? (
        <div>
          <MenuItem>
            <Link href='/dashboard'>
              <IconButton aria-label='show 4 new mails' color='inherit'>
                <DashboardIcon />
                <Typography style={{ marginLeft: '10px' }}>
                  Dashboard
                </Typography>
              </IconButton>
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleProfileMenuOpen;
              handleLogout();
            }}
          >
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <SupervisorAccountIcon />
              <Typography style={{ marginLeft: '10px' }}>Logout</Typography>
            </IconButton>
          </MenuItem>
        </div>
      ) : (
        <MenuItem>
          <Link href='/login'>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <SupervisorAccountIcon />
              <Typography style={{ marginLeft: '10px' }}>Login</Typography>
            </IconButton>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position='fixed'
        color='inherit'
        style={{ borderBottom: '2px solid #e0e0e0' }}
        elevation={0}
      >
        <Toolbar className={classes.toolbar}>
          <Typography color='primary' variant='h6' noWrap>
            STUDENT ASSIST
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <Button color='primary' variant='text' disableElevation>
              For Enterprise
            </Button> */}

            {state.user ? (
              <Box
                marginLeft='20px'
                display='flex'
                alignItems='center'
                style={{ cursor: 'pointer' }}
                onClick={handleClick}
              >
                <Avatar alt={state.user.name} src={''} />
                <Typography
                  variant='overline'
                  style={{ marginLeft: '1rem', fontSize: '1.1rem' }}
                >
                  {state.user.name}
                </Typography>
              </Box>
            ) : (
              <>
                <Button color='primary' variant='text' disableElevation>
                  For Enterprise
                </Button>
                <Link href='/login'>
                  <Button color='primary' variant='outlined' disableElevation>
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

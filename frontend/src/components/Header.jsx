import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  Avatar,
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import Logo from './Logo';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const userContext = useAuth();

  const [userMenuVisibility, setUserMenuVisibility] = useState(null);

  const handleOpenUserMenu = (event) => {
    setUserMenuVisibility(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuVisibility(null);
  };

  const handleLogout = () => {
    console.log('logging out');
    handleCloseUserMenu();
    userContext.logout();
    navigate('/login');
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={userMenuVisibility}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userMenuVisibility)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

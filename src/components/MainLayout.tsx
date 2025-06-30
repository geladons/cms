
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, IconButton, Box, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from './contexts/ThemeContext';
import jwt_decode from 'jwt-decode';

const MainLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  let userRole = '';
  if (token) {
    const decoded: any = jwt_decode(token);
    userRole = decoded.role;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            Schedulify
          </Typography>
          <Button color="inherit" component={Link} to="/booking">
            Book Now
          </Button>
          <Button color="inherit" component={Link} to="/team">
            Our Team
          </Button>
          <Button color="inherit" component={Link} to="/blog">
            Blog
          </Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                My Dashboard
              </Button>
              {userRole === 'admin' && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}
              <Button color="inherit" onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link to="/">Schedulify</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;

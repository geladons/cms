import React from 'react';
import {
  Container,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import UserList from './admin/UserList';
import BookingList from './admin/BookingList';
import AuthSettings from './admin/AuthSettings';
import ThemeSettings from './admin/ThemeSettings';

const drawerWidth = 240;

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/admin/users">
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/admin/bookings">
            <ListItemText primary="Bookings" />
          </ListItem>
          <ListItem button component={Link} to="/admin/settings/auth">
            <ListItemText primary="Auth Settings" />
          </ListItem>
          <ListItem button component={Link} to="/admin/settings/theme">
            <ListItemText primary="Theme Settings" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route path="users" element={<UserList />} />
          <Route path="bookings" element={<BookingList />} />
          <Route path="settings/auth" element={<AuthSettings />} />
          <Route path="settings/theme" element={<ThemeSettings />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
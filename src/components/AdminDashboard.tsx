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
import NotificationSettings from './admin/NotificationSettings';
import Reports from './admin/Reports';
import TimeOffRequests from './admin/TimeOffRequests';
import ClientDetails from './admin/ClientDetails';
import LoyaltySettings from './admin/LoyaltySettings';
import ReviewManagement from './admin/ReviewManagement';
import ServiceManagement from './admin/ServiceManagement';
import CouponManagement from './admin/CouponManagement';
import BlogManagement from './admin/BlogManagement';
import BlogEditor from './admin/BlogEditor';

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
          <ListItem button component={Link} to="/admin/settings/notifications">
            <ListItemText primary="Notification Settings" />
          </ListItem>
          <ListItem button component={Link} to="/admin/reports">
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button component={Link} to="/admin/time-off">
            <ListItemText primary="Time Off Requests" />
          </ListItem>
          <ListItem button component={Link} to="/admin/settings/loyalty">
            <ListItemText primary="Loyalty Settings" />
          </ListItem>
          <ListItem button component={Link} to="/admin/reviews">
            <ListItemText primary="Reviews" />
          </ListItem>
          <ListItem button component={Link} to="/admin/services">
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem button component={Link} to="/admin/coupons">
            <ListItemText primary="Coupons" />
          </ListItem>
          <ListItem button component={Link} to="/admin/blog">
            <ListItemText primary="Blog" />
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
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="time-off" element={<TimeOffRequests />} />
          <Route path="users/:id" element={<ClientDetails />} />
          <Route path="settings/loyalty" element={<LoyaltySettings />} />
          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="coupons" element={<CouponManagement />} />
          <Route path="blog" element={<BlogManagement />} />
          <Route path="blog/new" element={<BlogEditor />} />
          <Route path="blog/:id" element={<BlogEditor />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
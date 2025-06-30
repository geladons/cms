
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Register from './components/Register';
import Login from './components/Login';
import Calendar from './components/Calendar';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './components/AdminDashboard';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';
import ClientDashboard from './components/ClientDashboard';
import PrivateRoute from './components/PrivateRoute';
import EmployeeDashboard from './components/EmployeeDashboard';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/calendar">
              Calendar
            </Button>
            <Button color="inherit" component={Link} to="/dashboard">
              My Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/admin">
              Admin
            </Button>
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="client" element={<ClientDashboard />} />
              <Route path="employee" element={<EmployeeDashboard />} />
            </Route>
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/MainLayout';
import LandingPage from './components/LandingPage';
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
import Team from './components/Team';
import EmployeeProfile from './components/EmployeeProfile';
import MapView from './components/MapView';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<Calendar />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:id" element={<EmployeeProfile />} />
            import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

// ... (inside MainLayout in a different file)

// ... (in App.tsx)
            <Route path="/map" element={<MapView />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;


import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      const userRole = decoded.role;

      if (userRole === 'client') {
        navigate('/dashboard/client');
      } else if (userRole === 'employee') {
        navigate('/dashboard/employee');
      } else if (userRole === 'admin') {
        navigate('/admin');
      }
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default Dashboard;

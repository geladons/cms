
import React, { useState } from 'react';
import { Container, Box, Tabs, Tab } from '@mui/material';
import AssignedBookings from './employee/AssignedBookings'; // We'll create this next
import Availability from './employee/Availability';
import TimeOff from './employee/TimeOff';

const EmployeeDashboard = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 8 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="My Assigned Bookings" />
          <Tab label="My Availability" />
          <Tab label="Time Off" />
        </Tabs>
        {tab === 0 && <AssignedBookings />}
        {tab === 1 && <Availability />}
        {tab === 2 && <TimeOff />}
      </Box>
    </Container>
  );
};

export default EmployeeDashboard;

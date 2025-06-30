
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from '@mui/material';
import Profile from './Profile';

const ClientDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (tab === 0) {
      fetchBookings();
    }
  }, [tab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="My Bookings" />
          <Tab label="My Profile" />
        </Tabs>
        {tab === 0 && (
          <Box>
            <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
              My Bookings
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {bookings.map((booking: any) => (
                <ListItem key={booking._id}>
                  <ListItemText
                    primary={`Date: ${new Date(booking.date).toLocaleDateString()}`}
                    secondary={`Time: ${booking.startTime} - ${booking.endTime} | Status: ${booking.status}`}
                  />
                  {booking.paid && (
                    <Button
                      variant="contained"
                      onClick={() => window.open(`http://localhost:5000/api/bookings/${booking._id}/invoice`)}
                    >
                      Download Invoice
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {tab === 1 && <Profile />}
      </Box>
    </Container>
  );
};

export default ClientDashboard;

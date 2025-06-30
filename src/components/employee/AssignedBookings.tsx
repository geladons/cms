
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const AssignedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings/my-assigned-bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2 }}>
        My Assigned Bookings
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {bookings.map((booking: any) => (
          <ListItem key={booking._id}>
            <ListItemText
              primary={`Date: ${new Date(booking.date).toLocaleDateString()}`}
              secondary={`Time: ${booking.startTime} - ${booking.endTime} | Status: ${booking.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AssignedBookings;

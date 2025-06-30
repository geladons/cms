
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

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings');
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          My Bookings
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
      </Box>
    </Container>
  );
};

export default Bookings;

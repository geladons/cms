
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    fee: 50, // Assuming a fixed fee for now
  });

  const { date, startTime, endTime, fee } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        user: 'mock-user-id', // Replace with actual user ID
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Book a Session
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="startTime"
            label="Start Time"
            name="startTime"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            value={startTime}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="endTime"
            label="End Time"
            name="endTime"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            value={endTime}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BookingForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Availability = () => {
  const [availability, setAvailability] = useState(
    days.map(day => ({ day, slots: [{ startTime: '', endTime: '' }] }))
  );

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/availability', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.length) {
          setAvailability(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvailability();
  }, []);

  const handleSlotChange = (dayIndex: number, slotIndex: number, field: string, value: string) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots[slotIndex] = {
      ...newAvailability[dayIndex].slots[slotIndex],
      [field]: value,
    };
    setAvailability(newAvailability);
  };

  const addSlot = (dayIndex: number) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots.push({ startTime: '', endTime: '' });
    setAvailability(newAvailability);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots.splice(slotIndex, 1);
    setAvailability(newAvailability);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/availability', { availability }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Availability saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save availability.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2 }}>
        My Availability
      </Typography>
      <Grid container spacing={2}>
        {availability.map((day, dayIndex) => (
          <Grid item xs={12} key={day.day}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{day.day}</Typography>
              {day.slots.map((slot, slotIndex) => (
                <Box key={slotIndex} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TextField
                    label="Start Time"
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => handleSlotChange(dayIndex, slotIndex, 'startTime', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mr: 1 }}
                  />
                  <TextField
                    label="End Time"
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => handleSlotChange(dayIndex, slotIndex, 'endTime', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mr: 1 }}
                  />
                  <Button onClick={() => removeSlot(dayIndex, slotIndex)}>Remove</Button>
                </Box>
              ))}
              <Button onClick={() => addSlot(dayIndex)} sx={{ mt: 1 }}>Add Slot</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
        Save Availability
      </Button>
    </Container>
  );
};

export default Availability;

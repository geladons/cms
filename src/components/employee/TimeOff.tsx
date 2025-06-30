
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const TimeOff = () => {
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const fetchTimeOffRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      // This endpoint doesn't exist yet for employees, we'll add it next
      const res = await axios.get('http://localhost:5000/api/availability/timeoff/my-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimeOffRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimeOffRequests();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/availability/timeoff', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTimeOffRequests();
      setFormData({ startDate: '', endDate: '', reason: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2 }}>
        Request Time Off
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="startDate"
          label="Start Date"
          name="startDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="endDate"
          label="End Date"
          name="endDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="reason"
          label="Reason"
          name="reason"
          multiline
          rows={4}
          value={formData.reason}
          onChange={onChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Request
        </Button>
      </Box>

      <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 2 }}>
        My Time Off Requests
      </Typography>
      <List>
        {timeOffRequests.map((request: any) => (
          <ListItem key={request._id}>
            <ListItemText
              primary={`${new Date(request.startDate).toLocaleDateString()} - ${new Date(request.endDate).toLocaleDateString()}`}
              secondary={`Reason: ${request.reason} | Status: ${request.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TimeOff;

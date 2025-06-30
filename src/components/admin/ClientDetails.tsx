
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Divider,
} from '@mui/material';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [bookings, setBookings] = useState([]);
  const [note, setNote] = useState('');

  const fetchClientDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/crm/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClient(res.data.user);
      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/crm/users/${id}/notes`, { content: note }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNote('');
      fetchClientDetails(); // Refresh details
    } catch (err) {
      console.error(err);
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {client.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {client.email}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Booking History</Typography>
            <Paper>
              <List>
                {bookings.map((booking: any) => (
                  <ListItem key={booking._id}>
                    <ListItemText
                      primary={`${new Date(booking.date).toLocaleDateString()} - ${booking.startTime}`}
                      secondary={`Status: ${booking.status} | Fee: $${booking.fee}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Notes</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              <List>
                {client.notes.map((n: any) => (
                  <ListItem key={n._id}>
                    <ListItemText
                      primary={n.content}
                      secondary={`By Admin on ${new Date(n.createdAt).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            <TextField
              label="Add a new note"
              multiline
              rows={4}
              fullWidth
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddNote} sx={{ mt: 1 }}>
              Add Note
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ClientDetails;

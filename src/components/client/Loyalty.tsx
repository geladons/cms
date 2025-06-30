
import React, { useState, useEffect } from 'react';
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
  Divider,
} from '@mui/material';

const Loyalty = () => {
  const [loyaltyData, setLoyaltyData] = useState({ points: 0, history: [] });

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/loyalty', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoyaltyData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLoyaltyData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loyalty Rewards
        </Typography>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Your Points Balance</Typography>
          <Typography variant="h3" color="primary">
            {loyaltyData.points}
          </Typography>
        </Paper>
        <Divider />
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Transaction History
        </Typography>
        <Paper>
          <List>
            {loyaltyData.history.map((item: any) => (
              <ListItem key={item._id}>
                <ListItemText
                  primary={item.description}
                  secondary={`${item.type === 'earned' ? '+' : '-'}${item.points} points on ${new Date(item.createdAt).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Loyalty;

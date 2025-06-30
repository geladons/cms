
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        // This endpoint doesn't exist yet, but we can use the user from the token
        // For now, we'll just pre-fill with some data
        setFormData({
          name: 'Test User',
          email: 'test@example.com',
          address: '',
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          My Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={formData.address}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;

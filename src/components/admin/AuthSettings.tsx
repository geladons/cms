
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';

const AuthSettings = () => {
  const [settings, setSettings] = useState({
    emailPassword: true,
    google: false,
    apple: false,
    sms: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings/auth');
        setSettings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = 'your_admin_jwt_token'; // Replace with actual token
      await axios.put('http://localhost:5000/api/settings/auth', settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Authentication Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.emailPassword}
                onChange={handleChange}
                name="emailPassword"
              />
            }
            label="Email & Password"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.google}
                onChange={handleChange}
                name="google"
              />
            }
            label="Google"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.apple}
                onChange={handleChange}
                name="apple"
              />
            }
            label="Apple"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.sms}
                onChange={handleChange}
                name="sms"
              />
            }
            label="SMS (Phone Number)"
          />
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, alignSelf: 'flex-start' }}
        >
          Save Settings
        </Button>
      </Box>
    </Container>
  );
};

export default AuthSettings;

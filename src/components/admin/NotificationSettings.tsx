
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpSecure: false,
    smtpUser: '',
    smtpPass: '',
    emailFrom: '',
    enableConfirmation: true,
    enableCancellation: true,
  });

  useEffect(() => {
    // In a real application, you would fetch these settings from the server
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    // In a real application, you would save these settings to the server
    console.log(settings);
    alert('Settings saved successfully!');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Notification Settings
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="smtpHost"
          label="SMTP Host"
          name="smtpHost"
          value={settings.smtpHost}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="smtpPort"
          label="SMTP Port"
          name="smtpPort"
          value={settings.smtpPort}
          onChange={handleChange}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.smtpSecure}
                onChange={handleChange}
                name="smtpSecure"
              />
            }
            label="SMTP Secure"
          />
        </FormGroup>
        <TextField
          margin="normal"
          fullWidth
          id="smtpUser"
          label="SMTP User"
          name="smtpUser"
          value={settings.smtpUser}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="smtpPass"
          label="SMTP Password"
          name="smtpPass"
          type="password"
          value={settings.smtpPass}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="emailFrom"
          label="Email From Address"
          name="emailFrom"
          value={settings.emailFrom}
          onChange={handleChange}
        />
        <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 2 }}>
          Notification Types
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableConfirmation}
                onChange={handleChange}
                name="enableConfirmation"
              />
            }
            label="Booking Confirmation"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableCancellation}
                onChange={handleChange}
                name="enableCancellation"
              />
            }
            label="Booking Cancellation"
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

export default NotificationSettings;

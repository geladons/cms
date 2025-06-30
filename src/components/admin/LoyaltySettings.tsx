
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';

const LoyaltySettings = () => {
  const [settings, setSettings] = useState({
    pointsPerDollar: 1,
    centsPerPoint: 10,
  });

  useEffect(() => {
    // In a real application, you would fetch these settings from the server
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.value,
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
          Loyalty Settings
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="pointsPerDollar"
          label="Points Earned Per Dollar"
          name="pointsPerDollar"
          type="number"
          value={settings.pointsPerDollar}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="centsPerPoint"
          label="Cents Per Point (Redemption Value)"
          name="centsPerPoint"
          type="number"
          value={settings.centsPerPoint}
          onChange={handleChange}
        />
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

export default LoyaltySettings;


import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemeSettings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Theme Settings
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="theme-select-label">Theme</InputLabel>
          <Select
            labelId="theme-select-label"
            id="theme-select"
            value={theme}
            label="Theme"
            onChange={toggleTheme}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default ThemeSettings;

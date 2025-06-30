
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const Reports = () => {
  const [report, setReport] = useState({
    totalRevenue: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/reports', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReport();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Reports
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography component="p" variant="h4">
                ${report.totalRevenue.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Total Bookings
              </Typography>
              <Typography component="p" variant="h4">
                {report.totalBookings}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Reports;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import Profile from './Profile';
import Loyalty from './client/Loyalty';

import LeaveReview from './reviews/LeaveReview';

// ...
const ClientDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState('');

  const handleOpenReviewModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedBookingId('');
    setReviewModalOpen(false);
  };
// ...
                  {booking.paid && (
                    <Button
                      variant="contained"
                      onClick={() => window.open(`http://localhost:5000/api/bookings/${booking._id}/invoice`)}
                    >
                      Download Invoice
                    </Button>
                  )}
                  {booking.status === 'completed' && (
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenReviewModal(booking._id)}
                      sx={{ ml: 1 }}
                    >
                      Leave Review
                    </Button>
                  )}
                </ListItem>
// ...
        {tab === 2 && <Loyalty />}
      </Box>
      <LeaveReview
        open={reviewModalOpen}
        handleClose={handleCloseReviewModal}
        bookingId={selectedBookingId}
      />
    </Container>
  );
};

export default ClientDashboard;

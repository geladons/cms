
import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Rating,
} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LeaveReview = ({ open, handleClose, bookingId }: { open: boolean, handleClose: () => void, bookingId: string }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/reviews', {
        bookingId,
        rating,
        comment,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Leave a Review
        </Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue || 5);
          }}
        />
        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained">
          Submit Review
        </Button>
      </Box>
    </Modal>
  );
};

export default LeaveReview;

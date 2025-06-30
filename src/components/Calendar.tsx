
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Container,
} from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your-stripe-publishable-key'); // Replace with your key
const socket = io('http://localhost:5000');

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

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    fee: 50,
  });
  const [clientSecret, setClientSecret] = useState('');
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings');
        const formattedEvents = res.data.map((booking: any) => ({
          title: booking.status === 'confirmed' ? 'Booked' : 'Pending',
          start: `${booking.date.split('T')[0]}T${booking.startTime}`,
          end: `${booking.date.split('T')[0]}T${booking.endTime}`,
          allDay: false,
          backgroundColor: booking.status === 'confirmed' ? '#3788d8' : '#f0ad4e',
        }));
        setEvents(formattedEvents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();

    socket.on('bookingUpdate', (updatedBooking) => {
      setEvents((prevEvents) =>
        prevEvents.map((event: any) =>
          event.id === updatedBooking._id
            ? {
                ...event,
                title: updatedBooking.status === 'confirmed' ? 'Booked' : 'Pending',
                backgroundColor: updatedBooking.status === 'confirmed' ? '#3788d8' : '#f0ad4e',
              }
            : event
        )
      );
    });

    return () => {
      socket.off('bookingUpdate');
    };
  }, []);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClientSecret('');
    setBookingId('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBooking = async () => {
    try {
      // 1. Create booking with pending status
      const bookingRes = await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        date: selectedDate,
        user: 'mock-user-id', // Replace with actual user ID
      });
      setBookingId(bookingRes.data._id);

      // 2. Create payment intent
      const paymentRes = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { amount: formData.fee * 100 } // Amount in cents
      );
      setClientSecret(paymentRes.data.clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  const onSuccessfulCheckout = async () => {
    try {
      // 3. Update booking status to confirmed
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        status: 'confirmed',
      });
      socket.emit('bookingUpdate', { _id: bookingId, status: 'confirmed' });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        dateClick={handleDateClick}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book a Session on {selectedDate}
          </Typography>
          {!clientSecret ? (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="startTime"
                label="Start Time"
                name="startTime"
                type="time"
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="endTime"
                label="End Time"
                name="endTime"
                type="time"
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
              />
              <Button
                onClick={handleBooking}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Proceed to Payment
              </Button>
            </>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} onSuccessfulCheckout={onSuccessfulCheckout} />
            </Elements>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Calendar;

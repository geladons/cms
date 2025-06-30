
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
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [discount, setDiscount] = useState(0);

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

    const fetchLoyaltyPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/loyalty', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoyaltyPoints(res.data.points);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLoyaltyPoints();

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

// ...

  const handleRedeemPoints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/loyalty/redeem', { points: pointsToRedeem }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiscount(res.data.discount);
    } catch (err) {
      console.error(err);
    }
  };

// ...

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
              <Typography>You have {loyaltyPoints} points.</Typography>
              <TextField
                label="Points to Redeem"
                type="number"
                value={pointsToRedeem}
                onChange={(e) => setPointsToRedeem(parseInt(e.target.value, 10))}
                fullWidth
                margin="normal"
              />
              <Button onClick={handleRedeemPoints}>Redeem</Button>
              <Typography>Discount: ${discount.toFixed(2)}</Typography>
              <Typography>Final Price: ${(formData.fee - discount).toFixed(2)}</Typography>
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

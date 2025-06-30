
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
  import {
  // ...
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// ...

const Calendar = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  // ... (other state)

  useEffect(() => {
    // ...
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services/active');
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  const handleBooking = async () => {
    try {
      const bookingRes = await axios.post('http://localhost:5000/api/bookings', {
        serviceId: selectedService._id,
        date: selectedDate,
        startTime: formData.startTime,
        user: 'mock-user-id', // Replace with actual user ID
      });
      setBookingId(bookingRes.data._id);

      const finalPrice = selectedService.price - discount;
      const paymentRes = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { 
          amount: finalPrice * 100, // Amount in cents
          bookingId: bookingRes.data._id 
        }
      );
      setClientSecret(paymentRes.data.clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  // ...

  return (
    // ...
      <Modal
        // ...
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book a Session on {selectedDate}
          </Typography>
          {!clientSecret ? (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Service</InputLabel>
                <Select
                  value={selectedService?._id || ''}
                  onChange={(e) => {
                    const service = services.find((s: any) => s._id === e.target.value);
                    setSelectedService(service);
                  }}
                >
                  {services.map((service: any) => (
                    <MenuItem key={service._id} value={service._id}>
                      {service.name} (${service.price.toFixed(2)}) - {service.duration} min
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              
              {selectedService && (
                <>
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
                  <Typography>Final Price: ${(selectedService.price - discount).toFixed(2)}</Typography>
                </>
              )}

              <Button
                onClick={handleBooking}
                variant="contained"
                sx={{ mt: 2 }}
                disabled={!selectedService}
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


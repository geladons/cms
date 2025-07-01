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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);
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
  const [events, setEvents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({ startTime: '' });
  const [clientSecret, setClientSecret] = useState('');
  const [bookingId, setBookingId] = useState('');
  
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0);

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [bookingsRes, servicesRes, loyaltyRes] = await Promise.all([
          axios.get('http://localhost:5000/api/bookings'),
          axios.get('http://localhost:5000/api/services/active'),
          axios.get('http://localhost:5000/api/loyalty', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        ]);

        const formattedEvents = bookingsRes.data.map((booking: any) => ({
          title: booking.status === 'confirmed' ? 'Booked' : 'Pending',
          start: `${new Date(booking.date).toISOString().split('T')[0]}T${booking.startTime}`,
          end: `${new Date(booking.date).toISOString().split('T')[0]}T${booking.endTime}`,
          allDay: false,
          backgroundColor: booking.status === 'confirmed' ? '#3788d8' : '#f0ad4e',
          id: booking._id,
        }));
        setEvents(formattedEvents);
        setServices(servicesRes.data);
        setLoyaltyPoints(loyaltyRes.data.points);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();

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
    setSelectedService(null);
    setPointsToRedeem(0);
    setLoyaltyDiscount(0);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRedeemPoints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/loyalty/redeem', { points: pointsToRedeem }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoyaltyDiscount(res.data.discount);
    } catch (err) {
      console.error(err);
      alert('Failed to redeem points.');
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/coupons/validate', { code: couponCode });
      const { discountType, value } = res.data;
      const price = selectedService.price;
      
      if (discountType === 'percentage') {
        setCouponDiscount(price * (value / 100));
      } else {
        setCouponDiscount(value);
      }
      alert('Coupon applied!');
    } catch (err) {
      console.error(err);
      alert('Invalid or expired coupon.');
    }
  };

  const handleBooking = async () => {
    if (!selectedService) {
      alert('Please select a service.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const bookingRes = await axios.post('http://localhost:5000/api/bookings', {
        serviceId: selectedService._id,
        date: selectedDate,
        startTime: formData.startTime,
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      setBookingId(bookingRes.data._id);

      const finalPrice = selectedService.price - loyaltyDiscount - couponDiscount;
      
      const paymentRes = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { 
          amount: Math.round(finalPrice * 100),
          bookingId: bookingRes.data._id,
          couponCode: couponDiscount > 0 ? couponCode : undefined,
        }
      );
      setClientSecret(paymentRes.data.clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  const onSuccessfulCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/payments/confirm-payment`, {
        bookingId,
        couponCode: couponDiscount > 0 ? couponCode : undefined,
      }, { headers: { Authorization: `Bearer ${token}` } });
      
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
      const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [step, setStep] = useState(1); // 1: select service/time, 2: select employee, 3: payment

  const handleFindAvailability = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/services/availability', {
        params: {
          serviceId: selectedService._id,
          date: selectedDate,
          startTime: formData.startTime,
        },
      });
      setAvailableEmployees(res.data);
      setStep(2);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const bookingRes = await axios.post('http://localhost:5000/api/bookings', {
        serviceId: selectedService._id,
        date: selectedDate,
        startTime: formData.startTime,
        employeeId: selectedEmployee,
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      setBookingId(bookingRes.data._id);

      const finalPrice = selectedService.price - loyaltyDiscount - couponDiscount;
      
      const paymentRes = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { 
          amount: Math.round(finalPrice * 100),
          bookingId: bookingRes.data._id,
          couponCode: couponDiscount > 0 ? couponCode : undefined,
        }
      );
      setClientSecret(paymentRes.data.clientSecret);
      setStep(3);
    } catch (err) {
      console.error(err);
    }
  };

// ...

          {step === 1 && (
            <>
              {/* Service and Time Selection */}
              <Button onClick={handleFindAvailability} disabled={!selectedService || !formData.startTime}>
                Find Availability
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Employee Selection */}
              <Typography>Available Team Members:</Typography>
              <List>
                {availableEmployees.map((emp: any) => (
                  <ListItem key={emp._id} button onClick={() => setSelectedEmployee(emp._id)}>
                    <ListItemText primary={emp.name} secondary={emp.title} />
                  </ListItem>
                ))}
              </List>
              <Button onClick={handleBooking} disabled={!selectedEmployee}>
                Proceed to Payment
              </Button>
            </>
          )}

          {step === 3 && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} onSuccessfulCheckout={onSuccessfulCheckout} />
            </Elements>
          )}
        </Box>
      </Modal>
    </Container>
  );
};
    </Container>
  );
};

export default Calendar;
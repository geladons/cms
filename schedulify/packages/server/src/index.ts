
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import bookingRoutes from './routes/booking.routes';
import userRoutes from './routes/user.routes';
import settingsRoutes from './routes/settings.routes';
import smsRoutes from './routes/sms.routes';
import paymentRoutes from './routes/payment.routes';
import { loadPlugins } from './plugins/loader';
import './models/settings.model'; // Import to initialize settings
import './config/passport';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/schedulify';

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/payments', paymentRoutes);

loadPlugins(app);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('newBooking', (booking) => {
    io.emit('newBooking', booking);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

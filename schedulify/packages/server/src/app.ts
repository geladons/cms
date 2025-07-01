
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import bookingRoutes from './routes/booking.routes';
import userRoutes from './routes/user.routes';
import settingsRoutes from './routes/settings.routes';
import smsRoutes from './routes/sms.routes';
import paymentRoutes from './routes/payment.routes';
import profileRoutes from './routes/profile.routes';
import reportsRoutes from './routes/reports.routes';
import availabilityRoutes from './routes/availability.routes';
import crmRoutes from './routes/crm.routes';
import loyaltyRoutes from './routes/loyalty.routes';
import reviewsRoutes from './routes/reviews.routes';
import servicesRoutes from './routes/services.routes';
import couponsRoutes from './routes/coupons.routes';
import blogRoutes from './routes/blog.routes';
import { loadPlugins } from './plugins/loader';
import './models/settings.model'; // Import to initialize settings
import './config/passport';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/blog', blogRoutes);

loadPlugins(app);

export default app;

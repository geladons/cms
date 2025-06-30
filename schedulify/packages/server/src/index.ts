
import publicRoutes from './routes/public.routes';

import blogRoutes from './routes/blog.routes';

// ... (other imports)

app.use('/api/blog', blogRoutes);

// ... (rest of the file)

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
app.use('/api/profile', profileRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/coupons', couponsRoutes);

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

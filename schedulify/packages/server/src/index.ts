
import publicRoutes from './routes/public.routes';

import blogRoutes from './routes/blog.routes';

// ... (other imports)

app.use('/api/blog', blogRoutes);

// ... (rest of the file)

import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/schedulify';

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

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

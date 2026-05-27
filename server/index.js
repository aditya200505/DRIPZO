import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB, { sequelize } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import roastRoutes from './routes/roastRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import models to define associations
import User from './models/User.js';
import Shop from './models/Shop.js';
import Order from './models/Order.js';

// Setup Sequelize Associations
Shop.belongsTo(User, { as: 'owner', foreignKey: 'ownerId', onDelete: 'CASCADE' });
User.hasMany(Shop, { as: 'shops', foreignKey: 'ownerId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'SET NULL' });
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'SET NULL' });
Order.belongsTo(Shop, { foreignKey: 'shopId', onDelete: 'SET NULL' });
Shop.hasMany(Order, { foreignKey: 'shopId', onDelete: 'SET NULL' });

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.send('DRIPZO API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/roast', roastRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Socket.io for real-time order tracking
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import buildingRoutes from './routes/buildings.js';
import unitRoutes from './routes/units.js';
import residentRoutes from './routes/residents.js';
import paymentRoutes from './routes/payments.js';
import requestRoutes from './routes/requests.js';
import announcementRoutes from './routes/announcements.js';
import expenseRoutes from './routes/expenses.js';
import importRoutes from './routes/import.js';
import parkingRoutes from './routes/parking.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/import', importRoutes);
app.use('/api/parking', parkingRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`СӨХ server running on port ${PORT}`));

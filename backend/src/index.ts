import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import pool from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1');
    res.json({ message: 'Database connected successfully', data: rows });
  } catch (error) {
    const err = error as Error;
    console.error('Database connection error:', err);
    res.status(500).json({ message: 'Database connection failed', error: err.message || 'Unknown error' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Dental Clinic Management System API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

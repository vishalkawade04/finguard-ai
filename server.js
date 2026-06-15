require("dotenv").config();

const requiredEnv = ["JWT_SECRET", "MONGO_URI"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const analyticsRoutes = require("./src/routes/analyticsRoutes");
const cors = require('cors');
const express = require('express');

const helmet = require('helmet');

const morgan = require('morgan');

const rateLimit = require('express-rate-limit');

const connectDB = require('./src/config/db');

const transactionRoutes = require('./src/routes/transactionRoutes');

const authRoutes = require('./src/routes/authRoutes');

const errorHandler = require('./src/middleware/errorHandler');

const mongoose = require('mongoose');

// Prometheus metrics
const client = require('prom-client');
client.collectDefaultMetrics({ timeout: 5000 });

const app = express();
// Register common middleware before DB connect/start
app.use(express.json());
app.use(cors({ origin: '*' }));

// Security Headers
app.use(helmet());


// Logging
app.use(morgan('dev'));


// Rate Limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: 'Too many requests, please try again later'
});

app.use(limiter);


// Routes
app.use('/api/transactions', transactionRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/analytics', analyticsRoutes);


// Error Middleware
app.use(errorHandler);


// Test Route
app.get('/', (req, res) => {
    res.send('FinGuard API Running...');
});

// Health endpoint for readiness/liveness checks
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState; // 1 = connected
  const healthy = dbState === 1;
  res.status(healthy ? 200 : 500).json({
    status: healthy ? 'ok' : 'error',
    dbState,
    uptime: process.uptime()
  });
});

// Prometheus metrics
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

// Start server after DB connect
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Start the server only when this file is executed directly (not when imported by tests)
if (require.main === module) {
  startServer();
}

// Export app for testing
module.exports = app;

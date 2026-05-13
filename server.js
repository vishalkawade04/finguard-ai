const cors = require('cors');
const express = require('express');

const helmet = require('helmet');

const morgan = require('morgan');

const rateLimit = require('express-rate-limit');

const connectDB = require('./src/config/db');

const transactionRoutes = require('./src/routes/transactionRoutes');

const authRoutes = require('./src/routes/authRoutes');

const analyticsRoutes = require('./src/routes/analyticsRoutes');

const errorHandler = require('./src/middleware/errorHandler');

const app = express();


// Connect DB
connectDB();


// Middleware
app.use(express.json());
app.use(cors());

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


// Port
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

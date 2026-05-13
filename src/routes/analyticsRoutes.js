const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const adminMiddleware = require('../middleware/adminMiddleware');

const {
    getTotalTransactions,
    getFraudCount
} = require('../controllers/analyticsController');


// Total Transactions Analytics
router.get(
    '/total-transactions',
    authMiddleware,
    adminMiddleware,
    getTotalTransactions
);


// Fraud Transactions Analytics
router.get(
    '/fraud-count',
    authMiddleware,
    adminMiddleware,
    getFraudCount
);


module.exports = router;

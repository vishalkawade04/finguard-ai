const express = require('express');

const router = express.Router();

const validateTransaction = require('../middleware/validateTransaction');

const authMiddleware = require('../middleware/authMiddleware');

const adminMiddleware = require('../middleware/adminMiddleware');

const {
    createTransaction,
    getAllTransactions,
    getFraudTransactions,
    getTransactionsByUser
} = require('../controllers/transactionController');


// Create Transaction
router.post(
    '/add',
    validateTransaction,
    createTransaction
);


// Protected Route
router.get(
    '/',
    authMiddleware,
    getAllTransactions
);


// Admin Only Fraud Route
router.get(
    '/fraud',
    authMiddleware,
    adminMiddleware,
    getFraudTransactions
);


// Protected User Transactions
router.get(
    '/user/:userId',
    authMiddleware,
    getTransactionsByUser
);


module.exports = router;

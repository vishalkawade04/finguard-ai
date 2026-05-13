const Transaction = require('../models/Transaction');


// Create Transaction
const createTransaction = async (req, res) => {

    try {

        const { userId, amount, location } = req.body;

        let isFraud = false;

        let fraudReason = [];

        // Rule 1: High Amount
        if (amount > 10000) {

            isFraud = true;

            fraudReason.push('High transaction amount');

        }

        // Get recent user transactions
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

        const recentTransactions = await Transaction.find({
        userId: userId,
        createdAt: { $gte: oneMinuteAgo }
});

        // Rule 2: Too many recent transactions
        if (recentTransactions.length >= 3) {

            isFraud = true;

            fraudReason.push('Too many recent transactions');

        }

        // Rule 3: Duplicate transaction check
        const duplicateTransaction = await Transaction.findOne({
            userId,
            amount,
            location
        });

        if (duplicateTransaction) {

            isFraud = true;

            fraudReason.push('Duplicate transaction detected');

        }

        // Create Transaction
        const transaction = new Transaction({
            userId,
            amount,
            location,
            isFraud
        });

        // Save Transaction
        await transaction.save();

        res.status(201).json({
            success: true,
            message: 'Transaction Created',
            fraudReason,
            transaction
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Transactions
const getAllTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find();

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Fraud Transactions
const getFraudTransactions = async (req, res) => {

    try {

        const fraudTransactions = await Transaction.find({
            isFraud: true
        });

        res.status(200).json({
            success: true,
            count: fraudTransactions.length,
            fraudTransactions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Transactions By User
const getTransactionsByUser = async (req, res) => {

    try {

        const { userId } = req.params;

        const transactions = await Transaction.find({
            userId: userId
        });

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Export Functions
module.exports = {
    createTransaction,
    getAllTransactions,
    getFraudTransactions,
    getTransactionsByUser
};

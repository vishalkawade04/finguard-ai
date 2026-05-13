const Transaction = require('../models/Transaction');


// Total Transactions
const getTotalTransactions = async (req, res) => {

    try {

        const total = await Transaction.countDocuments();

        res.status(200).json({
            success: true,
            totalTransactions: total
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Fraud Transactions Count
const getFraudCount = async (req, res) => {

    try {

        const fraudCount = await Transaction.countDocuments({
            isFraud: true
        });

        res.status(200).json({
            success: true,
            fraudTransactions: fraudCount
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    getTotalTransactions,
    getFraudCount
};

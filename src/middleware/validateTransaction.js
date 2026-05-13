const validateTransaction = (req, res, next) => {

    const { userId, amount, location } = req.body;

    // Check Empty Fields
    if (!userId || !amount || !location) {

        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });

    }

    // Check Amount
    if (amount <= 0) {

        return res.status(400).json({
            success: false,
            message: 'Amount must be greater than 0'
        });

    }

    next();

};

module.exports = validateTransaction;

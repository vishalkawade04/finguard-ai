const validateTransaction = (req, res, next) => {
    let { userId, amount, location } = req.body;

    // If request is authenticated, prefer userId from token
    if ((!userId || typeof userId !== 'string' || !userId.trim()) && req.user && req.user.id) {
        userId = req.user.id;
    }

    if (!userId || typeof userId !== 'string' || !userId.trim()) {
        // Allow anonymous transactions, normalize to "Anonymous"
        userId = 'Anonymous';
    }

    if (typeof location !== 'string' || !location.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Location is required and must be a non-empty string.'
        });
    }

    const amountValue = Number(amount);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Amount must be a number greater than 0.'
        });
    }

    req.body.amount = amountValue;
    req.body.userId = userId.trim();
    req.body.location = location.trim();

    next();
};

module.exports = validateTransaction;

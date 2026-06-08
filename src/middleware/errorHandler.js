const errorHandler = (err, req, res, next) => {
    // Log error stack in server logs (avoid leaking stack to clients in production)
    console.error(err && err.stack ? err.stack : err);

    // Determine status code: prefer err.statusCode, otherwise use existing res.statusCode if it's not 200, else 500
    const statusCode = err && err.statusCode ? err.statusCode : (res && res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);

    // Normalize response
    res.status(statusCode).json({
        success: false,
        message: err && err.message ? err.message : 'Internal Server Error'
    });
};

module.exports = errorHandler;

const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    const user = req.session.user;
    if (!user) {
        res.status(401);
        throw new Error('Not authorized, no token');
    } else {
        next();
    }
});

// admin middleware

const admin = asyncHandler(async (req, res, next) => {
    const user = req.session.user;
    if (user && user.role === 2) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
});

module.exports = { protect, admin };
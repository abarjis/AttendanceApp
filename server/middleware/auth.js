const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../Utils/errorResponse');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token = '';

    if (req.headers.cookie) {
        token = req.headers.cookie.slice(6, req.headers.cookie.length);
    }
    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Unauthorized', 200));
    }
        
    const decoded = jwt.verify(token, 'attendance');
    
    req.userEmail = decoded.id;

    next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

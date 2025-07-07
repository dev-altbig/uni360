const jwt = require('jsonwebtoken');

// Middleware to verify token and authorize based on roles
const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        // 1. Get token from header
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        // 2. Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Add user payload to request object

            // 3. Check for role-based authorization
            if (allowedRoles && allowedRoles.length > 0) {
                const hasRole = allowedRoles.includes(req.user.role);
                if (!hasRole) {
                    return res.status(403).json({ message: 'Forbidden. You do not have access to this resource.' });
                }
            }
            
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: 'Invalid token.' });
        }
    };
};

module.exports = authMiddleware;
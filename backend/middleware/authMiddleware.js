const jwt = require('jsonwebtoken');


const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];


        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 


            if (allowedRoles && allowedRoles.length > 0) {
                const hasRole = allowedRoles.includes(req.user.role);
                if (!hasRole) {
                    return res.status(403).json({ message: 'Forbidden. You do not have access to this resource.' });
                }
            }
            
            next(); 
        } catch (error) {
            res.status(401).json({ message: 'Invalid token.' });
        }
    };
};

module.exports = authMiddleware;
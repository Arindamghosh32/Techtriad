const jwt = require('jsonwebtoken');

module.exports.isLoggedin = async (req, res, next) => {
    try {
        let token;
        
        // Check Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        
        // If no token in header, check cookies
        if (!token && req.cookies.token) {
            token = req.cookies.token;
        }

        // If no token found anywhere, return error
        if (!token) {
            return res.status(401).json({ message: 'The login is unsuccessful. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        // Attach user information to the request object
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(401).json({ message: 'Authentication failed. Please login again.' });
    }
};
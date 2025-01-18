const jwt = require('jsonwebtoken');

module.exports.isLoggedin = async (req, res, next) => {
    try {
        // Check if the token exists in cookies
        if (!req.cookies.token) {
            return res.status(401).json({ message: 'The login is unsuccessful. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        
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
        return res.status(500).json({ message: 'There is some technical issue by which login was not successful.' });
    }
};
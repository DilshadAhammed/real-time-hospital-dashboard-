const jwt = require("jsonwebtoken");

// Middleware to verify the JWT token
const authMiddleware= (req, res, next) => {
    // Check for token in the 'Authorization' header (bearer token format)
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
        
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Forbidden: Invalid token.');
            }
            
            // If token is valid, attach the decoded user info to the request object
            req.user = user;
            next(); // Continue to the next middleware/route handler
        });
    } else {
        res.status(401).send('Unauthorized: No token provided.');
    }
}

module.exports = authMiddleware
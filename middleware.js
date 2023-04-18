const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`Header: ${authHeader}`)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header not provided or invalid' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        console.log(`user: ${decoded}`)
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = {
    authMiddleware,
};

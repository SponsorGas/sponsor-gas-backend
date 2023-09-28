"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.verifyNewChallengeToken = exports.attachChallengeToken = void 0;
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
function attachChallengeToken(req, res, next) {
    const { paymasterId } = req.query;
    console.log(paymasterId);
    if (!paymasterId) {
        return res.status(400).json({
            error: "Invalid Request: Include paymasterId"
        });
    }
    // Create a JWT with the userIdentifier as payload
    const token = jwt.sign({ paymasterId }, secretKey, { expiresIn: '15m' });
    // Set the JWT as a cookie
    res.cookie('ChallengeRequestToken', token, { domain: process.env.SAMPLE_APPLICATION_DOMAIN, httpOnly: true, secure: true, sameSite: 'none', maxAge: 15 * 60 * 1000 });
    console.log("attachChallengeToken:added cookies");
    next();
}
exports.attachChallengeToken = attachChallengeToken;
// Middleware to verify the JWT token from cookies (client-side)
function verifyNewChallengeToken(req, res, next) {
    console.log('verifyNewChallengeToken');
    const token = req.cookies.ChallengeRequestToken;
    console.log(token);
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided.');
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized: Invalid token.');
        }
        next();
    });
}
exports.verifyNewChallengeToken = verifyNewChallengeToken;
// Middleware to verify the JWT token from cookies (client-side)
function verifyAccessToken(req, res, next) {
    const token = req.cookies.AccessToken;
    console.log(token);
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided.');
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized: Invalid token.');
        }
        next();
    });
}
exports.verifyAccessToken = verifyAccessToken;

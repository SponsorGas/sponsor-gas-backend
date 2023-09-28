import { Request, Response } from "express";
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

export function attachChallengeToken(req: Request, res: Response, next: () => void) {
  const {paymasterId} = req.query
  console.log(paymasterId)
  if(!paymasterId){
      return res.status(400).json(
          {
              error:"Invalid Request: Include paymasterId"
          }
      );
  }
   // Create a JWT with the userIdentifier as payload
   const token = jwt.sign({paymasterId }, secretKey, { expiresIn: '15m' });
   // Set the JWT as a cookie
   res.cookie('ChallengeRequestToken', token, { domain: process.env.SAMPLE_APPLICATION_DOMAIN,httpOnly: true,secure:true ,sameSite:'none'});
   console.log("attachChallengeToken:added cookies")
   next();
} 

// Middleware to verify the JWT token from cookies (client-side)
export function verifyNewChallengeToken(req: Request, res: Response, next: () => void) {
  console.log('verifyNewChallengeToken')
  const token = req.cookies.ChallengeRequestToken;
  console.log(token)
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided.');
  }

  jwt.verify(token, secretKey, (err: any, decoded: { paymasterId:string }) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token.');
    }
    next();
  });
}

// Middleware to verify the JWT token from cookies (client-side)
export function verifyAccessToken(req: Request, res: Response, next: () => void) {
  const token = req.cookies.AccessToken;
  console.log(token)
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided.');
  }

  jwt.verify(token, secretKey, (err: any, decoded: { scope:string,redirect_url:string }) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token.');
    }

    next();
  });
}

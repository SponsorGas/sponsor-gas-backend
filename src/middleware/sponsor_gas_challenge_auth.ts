import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Sample secret key for JWT (replace this with your secret key)
const secretKey = 'your_secret_key';

const authorizedTokens = new Set();
export function generateAndAttachChallengeToken(req: Request, res: Response, next: () => void) {
    

    const {paymasterId,scope,redirect_url} = req.query
    // console.log(`paymasterId : ${paymasterId}`)
    // console.log(`scope : ${scope}`)
    // console.log(`redirect_url : ${redirect_url}`)
    if(!scope || !redirect_url || !paymasterId){
        return res.status(400).json(
            {
                error:"Invalid Request: Include paymasterId, scope and redirect_url."
            }
        );
    }

     // Create a JWT with the userIdentifier as payload
       
     const token = jwt.sign({paymasterId, scope,redirect_url }, secretKey, { expiresIn: '15m' });

     // Set the JWT as a cookie
     res.cookie('ChallengeRequestToken', token, { httpOnly: true,secure:true ,sameSite:'none'});
     console.log("added cookies")
     // Attach the token to the response object so that it can be sent in the JSON response
     //res.locals.token = token;
 
     next();
   
   
}
// Middleware to verify the JWT token from cookies (client-side)
export function verifyChallengeToken(req: Request, res: Response, next: () => void) {
    const token = req.cookies.ChallengeRequestToken;
    
    if (!token) {
      return res.status(401).send('Unauthorized: No token provided.');
    }
  
    jwt.verify(token, secretKey, (err: any, decoded: { scope:string,redirect_url:string }) => {
      if (err) {
        return res.status(401).send('Unauthorized: Invalid token.');
      }
  
      // Extract the user identifier from the decoded payload
     // const userIdentifier = decoded.userIdentifier;
  
      // Add the user identifier to the request object for future use
      // req.scope = decoded.scope;
      // req.redirect_url = decoded.redirect_url;
  
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
    // Extract the user identifier from the decoded payload
   // const userIdentifier = decoded.userIdentifier;

    // Add the user identifier to the request object for future use
    // req.scope = decoded.scope;
    // req.redirect_url = decoded.redirect_url;

    next();
  });
}

	// function generateAuthorizationCode() {
  //       // Generate a 32-byte random buffer (adjust the length as needed)
  //       const buffer = crypto.randomBytes(32);
      
  //       // Convert the buffer to a hexadecimal string representation
  //       return buffer.toString('hex');
  //     }
    
  //       function generateAndAttachAccessToken(req: Request, res: Response) {
     
  //           const {auth_code,userOperation,chain,entryPointContractAddress} = req.body
        
  //           //validate UserOperation and Code 
  //           if(!authorizedTokens.has(auth_code)){
  //               return res.status(401).send('Unauthorized: Invalid token.');
  //           }
        
  //           // Create a JWT with the userIdentifier as payload
  //           const token = jwt.sign({ auth_code }, secretKey, { expiresIn: '1h' });
        
  //           // Set the JWT as a cookie
  //           res.cookie('AccessToken', token, { httpOnly: true });
        
        
  //           // next();
  //       }

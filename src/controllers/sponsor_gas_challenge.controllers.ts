import express, { Request, Response } from "express"
import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"
import { getSignedUserOpWithPaymasterData } from "../utils/UserOp";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

dotenvConfig({ path: resolve(__dirname, "./../../../../../.env") })

const authorizedTokens = new Set();

const paymasterWithScope = (_req: express.Request, _res: express.Response) => {
    try {
        const {scope,redirectUrl} = _req.query
				const {paymaster_address} = _req.params
          //res.json({ challenge, token: res.locals.token });
          _res.redirect(`/api/paymasters/${paymaster_address}/challenge`);
        // _res.setHeader("Content-Type", "application/json")
        // _res.status(200).end(JSON.stringify({ app_name: "SPONSOR GAS BACKEND" }))
    } catch (error: any) {
        console.error(error)
        _res.status(500).end()
    }
}

const paymasterChallenge = (_req: express.Request, _res: express.Response) => {
    try {
        const challenge = {
            type: 'question',
            question: 'What is the capital of France?',
            options: ['London', 'Paris', 'Berlin', 'Madrid'],
          };
          
          //res.json({ challenge, token: res.locals.token });
          _res.render('question-challenge', { challenge });
        // _res.setHeader("Content-Type", "application/json")
        // _res.status(200).end(JSON.stringify({ app_name: "SPONSOR GAS BACKEND" }))
    } catch (error: any) {
        console.error(error)
        _res.status(500).end()
    }
}
  const submitPaymasterChallenge = (req: Request, res: Response) => {
    // Extract the challenge response from the request body (assuming it's sent as JSON)
    
    const {answer} = req.body
    console.log(answer)
    // const { scope,redirect_url } = req;
  
    const authorizationCode = generateAuthorizationCode();
		authorizedTokens.add(authorizationCode); 

    //  authorizedTokens.add({'AuthCode':authorizationCode,'expire_in':Date.now()+(60*1000)}); //1 min

    // Here, you can process the challenge response as needed, e.g., validate the answer, store it in the database, etc.
    // For simplicity, we'll just send a response indicating success.
    // res.redirect(`${redirect_url}/?code=${authorizationCode}`);
    res.send({message:'Challenge response submitted successfully!',AuthCode:authorizationCode});
  }
	
const getAccessToken = (req: Request, res: Response) => {
		generateAndAttachAccessToken(req,res)
		res.status(200).send();
	};


//some middleware method as currently storing the authorization code on a 'set'

	function generateAuthorizationCode() {
    // Generate a 32-byte random buffer (adjust the length as needed)
    const buffer = crypto.randomBytes(32);
    // Convert the buffer to a hexadecimal string representation
    return buffer.toString('hex');
  }

	function generateAndAttachAccessToken(req: Request, res: Response) {
		const {auth_code,userOperation,chain,entryPointContractAddress} = req.body
		//validate UserOperation and Code 
		if(!authorizedTokens.has(auth_code)){
			return res.status(401).send('Unauthorized: Invalid token.');
		}
		// Create a JWT with the userIdentifier as payload
		const token = jwt.sign({ auth_code }, secretKey, { expiresIn: '1h' });
		// Set the JWT as a cookie
		res.cookie('AccessToken', token, { httpOnly: true });
	
	
		// next();
	}

	const getPaymasterAndData = async (req: Request, res: Response) => {
    try{
      console.log(`/paymaster/paymasterAndData`)
      const {_userOperation,entryPoint,chainId} = req.body
      console.log(`UserOperation Received : ${_userOperation}`)
      const signedUserOpWithPaymasterData = await getSignedUserOpWithPaymasterData(_userOperation,chainId,entryPoint)
      console.log(signedUserOpWithPaymasterData)
      if(signedUserOpWithPaymasterData){
        // Render the video challenge template and send it to the UI
        return res.status(200).send({"userOperation":signedUserOpWithPaymasterData});
      }
    }catch(err){
      return  res.status(400).send({'error':'Some error occurred'});
    }
    // Render the video challenge template and send it to the UI
    res.status(400).send({'error':'Some error occurred'});
  };


export = {
    paymasterChallenge,
		paymasterWithScope,
		submitPaymasterChallenge,
		getAccessToken,
		getPaymasterAndData
}  
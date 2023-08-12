import express, { Request, Response } from "express"
import { getSignedUserOpWithPaymasterData } from "../utils/UserOp";
import { getPaymasterCriteriaById, getPaymasterCriteriaForPaymasterId } from "../services";
import { Web3Storage } from "web3.storage";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
  

const authorizedTokens = new Set();
const getRandomValue = (arr: { type: string; value: any; }[]) => arr[Math.floor(Math.random() * arr.length)];

const paymasterWithScope = async (_req: express.Request, _res: express.Response) => {
  try {
      const { paymasterId, scope, redirectUrl } = _req.query;
      const { paymaster_address } = _req.params;

      const paymasterIdString: string = paymasterId?.toString() || '';

      const paymasterCriteria = await getPaymasterCriteriaForPaymasterId(paymasterIdString);
      const randomCriteria = getRandomValue(paymasterCriteria);

      let redirectPath = '';

      if (randomCriteria.type === 'video_challenge') {
          redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/video';
      } else if (randomCriteria.type === 'question_challenge') {
          redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/question';
      } else if (randomCriteria.type === 'identity') {
          redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/identity';
      } else if (randomCriteria.type === 'nft') {
          redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/nft';
      } else {
          _res.status(404).end();
          return;
      }

      // Append the criteria value as a query parameter in the redirect URL
      redirectPath += '?criteria=' + encodeURIComponent(randomCriteria.value);

      _res.redirect(redirectPath);
  } catch (error: any) {
      console.error(error);
      _res.status(500).end();
  }
}
async function streamToUint8Array(stream: ReadableStream<Uint8Array>) {
  const chunks = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
  }

  const totalLength = chunks.reduce((length, chunk) => length + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  chunks.forEach(chunk => {
    result.set(chunk, offset);
    offset += chunk.length;
  });

  return result;
}

const videoChallenge = async (_req: express.Request, _res: express.Response) => {
  try {
      const { criteria } = _req.query;
      if (!criteria) {
        throw new Error('Criteria not provided');
      }
      // criteria is a CID , to fetch video file
      const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY! })
      const videoFileResponse = await client.get(criteria as string)
      if(videoFileResponse){
        const files = await videoFileResponse.files();
        console.log(files)
        const videoFile = await files[0];
        const videoURL = `https://${videoFile.cid}.ipfs.w3s.link`
        _res.render('video-challenge', { videoURL });
      }
      // Render the video challenge template and send it to the UI
      // _res.render('video-challenge');
  } catch (error: any) {
      console.error(error)
      _res.status(500).end()
  }
}

const questionChallenge = async (_req: express.Request, _res: express.Response) => {
  try {
      const { criteria } = _req.query;
      if (!criteria) {
        throw new Error('Criteria not provided');
      }
      // criteria is a paymasterCriteriaId
      const paymasterCriteria = await getPaymasterCriteriaById(criteria as string);

      if (paymasterCriteria.type !== 'question_challenge'|| !paymasterCriteria.questionBook) {
          _res.status(400).end('Invalid or missing question challenge criteria');
          return;
      }
      const questionBook = JSON.parse(paymasterCriteria.questionBook as string)
      // Assuming paymasterCriteria.questionBook contains the JSON for question challenge
      const challenge = {
          type: 'question',
          question: questionBook.question,
          options: questionBook.options,
      };

      _res.render('question-challenge', { challenge });
  } catch (error: any) {
      console.error(error);
      _res.status(500).end();
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
    
    // const {answer} = req.body
    // console.log(answer)
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
		getPaymasterAndData,
    videoChallenge,
    questionChallenge
}  
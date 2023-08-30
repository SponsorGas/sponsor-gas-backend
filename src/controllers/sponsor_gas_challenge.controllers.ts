import express, { Request, Response } from "express"
import { getSignedUserOpWithPaymasterData } from "../utils/UserOp";
import { doesUserHoldNFT, getPaymasterCriteriaById, getPaymasterCriteriaForPaymasterId, getPaymasterCriteriasForPaymasterId, getPaymasterForId } from "../services";
import { Web3Storage } from "web3.storage";
import axios from 'axios'
import { CredentialType } from "@worldcoin/idkit";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const authorizedTokens = new Set();


const getAccessToken = (req: Request, res: Response) => {
  generateAndAttachAccessToken(req,res)
  res.status(200).send();
};

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
  res.cookie('AccessToken', token, { httpOnly: true, secure:true,sameSite:'none' });


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
      return res.status(200).send({"userOperation":signedUserOpWithPaymasterData});
    }
  }catch(err){
    return  res.status(400).send({'error':'Some error occurred'});
  }
  res.status(400).send({'error':'Some error occurred'});
};

const getChallengeData = async (req: express.Request, res: express.Response) => {
  try {
    const { paymasterId } = req.query;
    const paymasterIdString: string = paymasterId?.toString() || '';
    const paymasterCriterias = await getPaymasterCriteriasForPaymasterId(paymasterIdString);

    if (!paymasterCriterias) {
      return res.status(404).end(); // No criteria found
    }

    const challengeType = paymasterCriterias[0].type;
    let data: any = {};

    switch (challengeType) {
      case 'video_challenge':
        const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY! });
        const videoFileResponse = await client.get(paymasterCriterias[0].video as string);
        if (videoFileResponse) {
          const files = await videoFileResponse.files();
          const videoFile = files[0];
          data = {
            videoUrl: `https://${videoFile.cid}.ipfs.w3s.link`
          };
        }
        break;

      case 'question_challenge':
        const questionBook = JSON.parse(paymasterCriterias[0].questionBook?.toString()!);
        data = {
          question: questionBook.question,
          options: questionBook.options
        };
        break;

      case 'identity_challenge':
        if (paymasterCriterias[0].identityProvider === 'worldcoin') {
          const worldcoinData = {
            'identity_provider': 'worldcoin',
            'app_id': 'app_staging_05593ec5ccbc03aede3ee2a86e3686d6',
            'action': "identityproof",
            'credential_types': [CredentialType.Phone],
          };
          data = worldcoinData;
        }
        break;

      case 'nft_challenge':
        data = { nftCollection: paymasterCriterias[0].nftCollection ?? '' };
        break;

      default:
        return res.status(404).end("Invalid challenge type"); // Invalid challenge type
    }

    console.log(data);
    return res.status(200).send({ data: JSON.stringify(data) });
  } catch (error: any) {
    console.error(error);
    res.status(500).end();
  }
};

type VerifyReply = {
  code: string;
  detail?: string;
  AuthCode?:string
};

const submitPaymasterChallenge = async (req: Request, res: Response) => {
  try {
    const { paymasterId } = req.query;
    const data = req.body && req.body.data;
    const paymasterIdString: string = paymasterId?.toString() || '';
    const paymasterCriterias = await getPaymasterCriteriasForPaymasterId(paymasterIdString);
    const paymaster = await getPaymasterForId(paymasterIdString);

    if(paymasterId == null ||paymasterId  === undefined){
      return res.status(404).end('Invalid paymasterId');
    }
    if (!paymasterCriterias || paymasterCriterias.length === 0) {
      return res.status(404).end('No criteria found');
    }
    
    const challengeType = paymasterCriterias[0].type;

    switch (challengeType) {
      case 'video_challenge': {
        const authorizationCode = generateAuthorizationCode();
        authorizedTokens.add(authorizationCode);
        return res.status(200).send({ status: "success", AuthCode: authorizationCode });
      }

      case 'question_challenge': {
        const questionBook: { question: string, options: string[], answer: string } = JSON.parse(paymasterCriterias[0].questionBook?.toString()!);
        if (questionBook.options.includes(data.answer) && questionBook.answer === data.answer) {
          const authorizationCode = generateAuthorizationCode();
          authorizedTokens.add(authorizationCode);
          return res.status(200).send({ status: "success", AuthCode: authorizationCode });
        } else {
          return res.status(400).send({ status: "failed", message: "Incorrect answer" });
        }
      }

      case 'identity_challenge': {
        if (paymasterCriterias[0].identityProvider === 'worldcoin' && data.identity_provider === 'worldcoin') {
          const verifyRes: any = await verifyWorldcoinIdentity(data.worldcoin_data);
          console.log(verifyRes);
          if (verifyRes.status === 200) {
            const authorizationCode = generateAuthorizationCode();
            authorizedTokens.add(authorizationCode);
            return res.status(verifyRes.status).send({ code: "success", AuthCode: authorizationCode });
          } else {
            return res.status(verifyRes.status).send({
              code: verifyRes.data.code,
              detail: verifyRes.data.detail,
            });
          }
        }
        break;
      }

      case 'nft_challenge': {
        if (paymaster && data.userOperation?.sender) {
          const sender = data.userOperation.sender;
          const chainId = paymaster.chainId;
          const contractAddress = paymasterCriterias[0].nftCollection;
          const result = await doesUserHoldNFT(sender, contractAddress!, chainId);
          console.log(result);
          if (result) {
            const authorizationCode = generateAuthorizationCode();
            authorizedTokens.add(authorizationCode);
            return res.status(200).send({ status: "success", AuthCode: authorizationCode });
          } else {
            return res.status(400).send({ status: "failed", message: "User Don't hold NFT" });
          }
        }
        break;
      }

      default:
        return res.status(404).end("Invalid Challenge Type");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).end();
  }
};



	function verifyWorldcoinIdentity(worldcoinData:any) {
    const reqBody = {
      merkle_root: worldcoinData.merkle_root,
      nullifier_hash: worldcoinData.nullifier_hash,
      proof: worldcoinData.proof,
      credential_type: worldcoinData.credential_type,
      action: 'identityproof', // or get this from environment variables,
      signal: worldcoinData.signal ?? "", // if we don't have a signal, use the empty string
    }; 
    
    return axios.post(`https://developer.worldcoin.org/api/v1/verify/${process.env.WLD_APP_ID}`, reqBody, {
      headers: {
        "Content-Type": "application/json",
      }
    })
}
  
  // async function verifyNFTOwnership(req:express.Request, res: express.Response){
  //   const {paymasterId,scope,redirect_url} = req.query
  //   // const {chainId,paymaster_address} = req.params
  //   const sender = req.body.userOperation.sender;
  //   const paymaster = await getPaymasterForId(paymasterId as string)
    
  //   if(paymaster){
      
  //     const paymasterCriteria = paymaster.PaymasterCriteria?.find(pc => pc.type === 'nft_challenge' ) 
  //     if (paymasterCriteria){
  //       const chainId = paymaster.chainId
  //       const contractAddress = paymasterCriteria.nftCollection
  //       const result = await doesUserHoldNFT(sender,contractAddress!,chainId)
  //       console.log(result)
  //       if(result){
  //         const authorizationCode = generateAuthorizationCode();
  //         authorizedTokens.add(authorizationCode); 
  //         return res.status(200).send({ status: "success" ,AuthCode:authorizationCode});
  //       }
  //     }
  //   }
  //   res.status(400).send({ status:"failed",message: "User Don't hold NFT"});
    
    
  // }

export = {
		submitPaymasterChallenge,
		getAccessToken,
		getPaymasterAndData,
    getChallengeData
}  
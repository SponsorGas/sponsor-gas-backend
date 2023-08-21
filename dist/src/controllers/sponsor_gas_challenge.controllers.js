"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserOp_1 = require("../utils/UserOp");
const services_1 = require("../services");
const web3_storage_1 = require("web3.storage");
const axios_1 = __importDefault(require("axios"));
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const authorizedTokens = new Set();
const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];
const paymasterWithScope = async (_req, _res) => {
    try {
        const { paymasterId, scope, redirectUrl } = _req.query;
        const { paymaster_address } = _req.params;
        const paymasterIdString = paymasterId?.toString() || '';
        const paymasterCriteria = await (0, services_1.getPaymasterCriteriaForPaymasterId)(paymasterIdString);
        const randomCriteria = getRandomValue(paymasterCriteria);
        let redirectPath = '';
        if (randomCriteria.type === 'video_challenge') {
            redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/video';
        }
        else if (randomCriteria.type === 'question_challenge') {
            redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/question';
        }
        else if (randomCriteria.type === 'identity_challenge') {
            redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/identity';
        }
        else if (randomCriteria.type === 'nft_challenge') {
            redirectPath = '/api/paymasters/' + paymaster_address + '/challenges/nft';
        }
        else {
            _res.status(404).end();
            return;
        }
        // Append the criteria value as a query parameter in the redirect URL
        redirectPath += '?criteria=' + encodeURIComponent(randomCriteria.value);
        _res.redirect(redirectPath);
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
};
const videoChallenge = async (_req, _res) => {
    try {
        const { criteria } = _req.query;
        if (!criteria) {
            throw new Error('Criteria not provided');
        }
        // criteria is a CID , to fetch video file
        const client = new web3_storage_1.Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY });
        const videoFileResponse = await client.get(criteria);
        if (videoFileResponse) {
            const files = await videoFileResponse.files();
            console.log(files);
            const videoFile = await files[0];
            const videoURL = `https://${videoFile.cid}.ipfs.w3s.link`;
            _res.render('video-challenge', { videoURL });
        }
        // Render the video challenge template and send it to the UI
        // _res.render('video-challenge');
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
};
const questionChallenge = async (_req, _res) => {
    try {
        const { criteria } = _req.query;
        if (!criteria) {
            throw new Error('Criteria not provided');
        }
        // criteria is a paymasterCriteriaId
        const paymasterCriteria = await (0, services_1.getPaymasterCriteriaById)(criteria);
        if (paymasterCriteria.type !== 'question_challenge' || !paymasterCriteria.questionBook) {
            _res.status(400).end('Invalid or missing question challenge criteria');
            return;
        }
        const questionBook = JSON.parse(paymasterCriteria.questionBook);
        // Assuming paymasterCriteria.questionBook contains the JSON for question challenge
        const challenge = {
            type: 'question',
            question: questionBook.question,
            options: questionBook.options,
        };
        _res.render('question-challenge', { challenge });
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
};
const identityChallenge = async (_req, _res) => {
    try {
        const { criteria } = _req.query;
        if (!criteria) {
            throw new Error('Criteria not provided');
        }
        // criteria is a identity type
        if (criteria === 'worldcoin') {
            _res.render('worldcoin-challenge');
        }
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
};
const paymasterChallenge = (_req, _res) => {
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
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
};
const submitPaymasterChallenge = (req, res) => {
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
    res.send({ message: 'Challenge response submitted successfully!', AuthCode: authorizationCode });
};
const getAccessToken = (req, res) => {
    generateAndAttachAccessToken(req, res);
    res.status(200).send();
};
//some middleware method as currently storing the authorization code on a 'set'
function generateAuthorizationCode() {
    // Generate a 32-byte random buffer (adjust the length as needed)
    const buffer = crypto.randomBytes(32);
    // Convert the buffer to a hexadecimal string representation
    return buffer.toString('hex');
}
function generateAndAttachAccessToken(req, res) {
    const { auth_code, userOperation, chain, entryPointContractAddress } = req.body;
    //validate UserOperation and Code 
    if (!authorizedTokens.has(auth_code)) {
        return res.status(401).send('Unauthorized: Invalid token.');
    }
    // Create a JWT with the userIdentifier as payload
    const token = jwt.sign({ auth_code }, secretKey, { expiresIn: '1h' });
    // Set the JWT as a cookie
    res.cookie('AccessToken', token, { httpOnly: true, secure: true });
    // next();
}
const getPaymasterAndData = async (req, res) => {
    try {
        console.log(`/paymaster/paymasterAndData`);
        const { _userOperation, entryPoint, chainId } = req.body;
        console.log(`UserOperation Received : ${_userOperation}`);
        const signedUserOpWithPaymasterData = await (0, UserOp_1.getSignedUserOpWithPaymasterData)(_userOperation, chainId, entryPoint);
        console.log(signedUserOpWithPaymasterData);
        if (signedUserOpWithPaymasterData) {
            // Render the video challenge template and send it to the UI
            return res.status(200).send({ "userOperation": signedUserOpWithPaymasterData });
        }
    }
    catch (err) {
        return res.status(400).send({ 'error': 'Some error occurred' });
    }
    // Render the video challenge template and send it to the UI
    res.status(400).send({ 'error': 'Some error occurred' });
};
async function verifyNFTOwnership(req, res) {
    const { paymasterId, scope, redirect_url } = req.query;
    const { chainId, paymaster_address } = req.params;
    const sender = req.body.userOperation.sender;
    const paymaster = await (0, services_1.getPaymasterForId)(paymasterId);
    if (paymaster) {
        const paymasterCriteria = paymaster.PaymasterCriteria?.find(pc => pc.type === 'nft_challenge');
        if (paymasterCriteria) {
            const contractAddress = paymasterCriteria.nftCollection;
            const result = await (0, services_1.doesUserHoldNFT)(sender, contractAddress, chainId);
            console.log(result);
            if (result) {
                const authorizationCode = generateAuthorizationCode();
                authorizedTokens.add(authorizationCode);
                return res.status(200).send({ status: "success", AuthCode: authorizationCode });
            }
        }
    }
    res.status(403).send({ status: "User Don't hold NFT" });
}
function verifyWorldcoinIdentity(req, res) {
    try {
        const reqBody = {
            merkle_root: req.body.data.merkle_root,
            nullifier_hash: req.body.data.nullifier_hash,
            proof: req.body.data.proof,
            credential_type: req.body.data.credential_type,
            action: 'identityproof',
            signal: req.body.signal ?? "", // if we don't have a signal, use the empty string
        };
        axios_1.default.post(`https://developer.worldcoin.org/api/v1/verify/${process.env.WLD_APP_ID}`, reqBody, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((verifyRes) => {
            console.log(verifyRes);
            if (verifyRes.status == 200) {
                // this is where you should perform backend actions based on the verified credential
                // i.e. setting a user as "verified" in a database
                const authorizationCode = generateAuthorizationCode();
                authorizedTokens.add(authorizationCode);
                res.status(verifyRes.status).send({ code: "success", AuthCode: authorizationCode });
            }
            else {
                // return the error code and detail from the World ID /verify endpoint to our frontend
                res.status(verifyRes.status).send({
                    code: verifyRes.data.code,
                    detail: verifyRes.data.detail,
                });
            }
        }).catch(e => {
            console.log(e);
            console.log('Error Occured');
            return res.status(500);
        });
    }
    catch (e) {
        res.status(500);
    }
}
module.exports = {
    paymasterChallenge,
    paymasterWithScope,
    submitPaymasterChallenge,
    getAccessToken,
    getPaymasterAndData,
    videoChallenge,
    questionChallenge,
    identityChallenge,
    verifyWorldcoinIdentity,
    verifyNFTOwnership
};

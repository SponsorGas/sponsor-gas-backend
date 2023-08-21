"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorGasChallengeRouter = void 0;
const express_1 = __importDefault(require("express"));
const sponsorGasChallengeController = require("../controllers/sponsor_gas_challenge.controllers");
const sponsor_gas_challenge_auth_1 = require("../middleware/sponsor_gas_challenge_auth");
/**
 * Router Definition
 */
exports.sponsorGasChallengeRouter = express_1.default.Router();
exports.sponsorGasChallengeRouter.get("/chains/:chainId/paymasters/:paymaster_address", sponsor_gas_challenge_auth_1.generateAndAttachChallengeToken, sponsorGasChallengeController.paymasterWithScope);
exports.sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenge", sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.paymasterChallenge);
exports.sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenges/question", sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.questionChallenge);
exports.sponsorGasChallengeRouter.post("/paymasters/:paymaster_address/challenges/question/submit", sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge);
exports.sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenges/video", sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.videoChallenge);
exports.sponsorGasChallengeRouter.post("/paymasters/:paymaster_address/challenges/video/submit", sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge);
exports.sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenges/identity", sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.identityChallenge);
exports.sponsorGasChallengeRouter.post("/paymasters/:paymaster_address/challenges/identity/worldcoin/submit", sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.verifyWorldcoinIdentity);
exports.sponsorGasChallengeRouter.post("/chains/:chainId/paymasters/:paymaster_address/challenges/nft/submit", sponsor_gas_challenge_auth_1.generateAndAttachChallengeToken, sponsorGasChallengeController.verifyNFTOwnership);
exports.sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/challenge/submit', sponsor_gas_challenge_auth_1.verifyChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge);
exports.sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/access_token', sponsorGasChallengeController.getAccessToken);
exports.sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/paymasterAndData', sponsor_gas_challenge_auth_1.verifyAccessToken, sponsorGasChallengeController.getPaymasterAndData);

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
exports.sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/access_token', sponsorGasChallengeController.getAccessToken);
exports.sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/paymasterAndData', sponsor_gas_challenge_auth_1.verifyAccessToken, sponsorGasChallengeController.getPaymasterAndData);
exports.sponsorGasChallengeRouter.get("/challenges/:challengeType", sponsor_gas_challenge_auth_1.attachChallengeToken, sponsorGasChallengeController.getChallengeData);
exports.sponsorGasChallengeRouter.post('/challenges/:challengeType/submit', sponsor_gas_challenge_auth_1.verifyNewChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge);

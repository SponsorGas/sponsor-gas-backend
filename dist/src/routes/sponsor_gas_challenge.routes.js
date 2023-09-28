"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorGasChallengeRouter = void 0;
const express_1 = __importDefault(require("express"));
const sponsorGasChallengeController = require("../controllers/sponsor_gas_challenge.controllers");
/**
 * Router Definition
 */
exports.sponsorGasChallengeRouter = express_1.default.Router();
exports.sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/access_token', sponsorGasChallengeController.getAccessToken);
// sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/paymasterAndData', verifyAccessToken, sponsorGasChallengeController.getPaymasterAndData )
// sponsorGasChallengeRouter.get("/challenges/:challengeType",attachChallengeToken,sponsorGasChallengeController.getChallengeData)
// sponsorGasChallengeRouter.post('/challenges/:challengeType/submit', verifyNewChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge)
exports.sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/paymasterAndData', sponsorGasChallengeController.getPaymasterAndData);
exports.sponsorGasChallengeRouter.get("/challenges/:challengeType", sponsorGasChallengeController.getChallengeData);
exports.sponsorGasChallengeRouter.post('/challenges/:challengeType/submit', sponsorGasChallengeController.submitPaymasterChallenge);

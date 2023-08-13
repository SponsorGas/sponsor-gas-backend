import express from "express"
import sponsorGasChallengeController = require("../controllers/sponsor_gas_challenge.controllers")
import { generateAndAttachChallengeToken, verifyAccessToken, verifyChallengeToken } from "../middleware/sponsor_gas_challenge_auth"

/**
 * Router Definition
 */
export const sponsorGasChallengeRouter = express.Router()

sponsorGasChallengeRouter.get("/chains/:chainId/paymasters/:paymaster_address",generateAndAttachChallengeToken ,sponsorGasChallengeController.paymasterWithScope)
sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenge",verifyChallengeToken, sponsorGasChallengeController.paymasterChallenge)

sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenges/question",verifyChallengeToken, sponsorGasChallengeController.questionChallenge)
sponsorGasChallengeRouter.post("/paymasters/:paymaster_address/challenges/question/submit",verifyChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge)

sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenges/video",verifyChallengeToken, sponsorGasChallengeController.videoChallenge)
sponsorGasChallengeRouter.post("/paymasters/:paymaster_address/challenges/video/submit",verifyChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge)


sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenges/identity",verifyChallengeToken, sponsorGasChallengeController.identityChallenge)
sponsorGasChallengeRouter.post("/paymasters/:paymaster_address/challenges/identity/worldcoin/submit",verifyChallengeToken, sponsorGasChallengeController.verifyWorldcoinIdentity)


sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/challenge/submit', verifyChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge)
sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/access_token', sponsorGasChallengeController.getAccessToken)
sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/paymasterAndData', verifyAccessToken, sponsorGasChallengeController.getPaymasterAndData )
  
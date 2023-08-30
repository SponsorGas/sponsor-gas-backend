import express from "express"
import sponsorGasChallengeController = require("../controllers/sponsor_gas_challenge.controllers")
import { attachChallengeToken, generateAndAttachChallengeToken, verifyAccessToken, verifyChallengeToken, verifyNewChallengeToken } from "../middleware/sponsor_gas_challenge_auth"

/**
 * Router Definition
 */
export const sponsorGasChallengeRouter = express.Router()

sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/access_token', sponsorGasChallengeController.getAccessToken)
sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/paymasterAndData', verifyAccessToken, sponsorGasChallengeController.getPaymasterAndData )
  
sponsorGasChallengeRouter.get("/challenges/:challengeType",attachChallengeToken,sponsorGasChallengeController.getChallengeData)
sponsorGasChallengeRouter.post('/challenges/:challengeType/submit', verifyNewChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge)

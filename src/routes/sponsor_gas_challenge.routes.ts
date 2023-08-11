import express from "express"
import sponsorGasChallengeController = require("../controllers/sponsor_gas_challenge.controllers")
import { generateAndAttachChallengeToken, verifyAccessToken, verifyChallengeToken } from "../middleware/sponsor_gas_challenge_auth"

/**
 * Router Definition
 */
export const sponsorGasChallengeRouter = express.Router()

sponsorGasChallengeRouter.get("/paymasters/:paymaster_address",generateAndAttachChallengeToken ,sponsorGasChallengeController.paymasterWithScope)
sponsorGasChallengeRouter.get("/paymasters/:paymaster_address/challenge",verifyChallengeToken, sponsorGasChallengeController.paymasterChallenge)

sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/challenge/submit', verifyChallengeToken, sponsorGasChallengeController.submitPaymasterChallenge)
sponsorGasChallengeRouter.post('/paymasters/:paymaster_address/access_token', sponsorGasChallengeController.getAccessToken)

sponsorGasChallengeRouter.post('/paymasters/0x1234/paymasterAndData', verifyAccessToken, sponsorGasChallengeController.getPaymasterAndData )
  
import express from "express"
import sponsorGasController = require("../controllers/sponsor_gas.controllers")

/**
 * Router Definition
 */
export const sponsorGasRouter = express.Router()

sponsorGasRouter.get("/application-name", sponsorGasController.applicationName)


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorGasRouter = void 0;
const express_1 = __importDefault(require("express"));
const sponsorGasController = require("../controllers/sponsor_gas.controllers");
/**
 * Router Definition
 */
exports.sponsorGasRouter = express_1.default.Router();
exports.sponsorGasRouter.get("/application-name", sponsorGasController.applicationName);
exports.sponsorGasRouter.get("/paymasters/:id", sponsorGasController.handlePaymasterById);
exports.sponsorGasRouter.get("/chains/:chainId/applications/:application_contract_address/paymasters", sponsorGasController.getPaymastersForApplicationAddressAndChainId);

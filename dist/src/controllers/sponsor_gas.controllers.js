"use strict";
const services_1 = require("../services");
const applicationName = (_req, _res) => {
    try {
        _res.setHeader("Content-Type", "application/json");
        _res.status(200).end(JSON.stringify({ app_name: "SPONSOR GAS BACKEND" }));
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
};
const getPaymastersForApplicationAddressAndChainId = async (_req, _res) => {
    try {
        console.log(`getPaymastersForApplicationAndChain ${_req.params}`);
        const applicationContractAddress = _req.params.application_contract_address;
        const chainId = _req.params.chainId;
        if (chainId && applicationContractAddress) {
            const paymasters = await (0, services_1.getPaymastersOnChainForApplication)(chainId, applicationContractAddress);
            console.log("Paymasters for the application:", JSON.stringify(paymasters));
            _res.setHeader("Content-Type", "application/json");
            if (paymasters) {
                return _res.status(200).end(JSON.stringify({ paymasters }));
            }
            else {
                return _res.status(200).end(JSON.stringify({ paymasters: [] }));
            }
        }
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
    _res.status(500).end();
};
const handlePaymasterById = async (_req, _res) => {
    try {
        console.log(`getPaymasterById ${_req.params}`);
        const id = _req.params.id;
        if (id) {
            const paymaster = await (0, services_1.getPaymasterForId)(id);
            console.log(`Paymasters for the id :${id}: ${JSON.stringify(paymaster)}`);
            _res.setHeader("Content-Type", "application/json");
            if (paymaster) {
                return _res.status(200).end(JSON.stringify({ paymaster }));
            }
            else {
                return _res.status(404).end();
            }
        }
    }
    catch (error) {
        console.error(error);
        _res.status(500).end();
    }
    _res.status(500).end();
};
module.exports = {
    applicationName,
    getPaymastersForApplicationAddressAndChainId,
    handlePaymasterById
};

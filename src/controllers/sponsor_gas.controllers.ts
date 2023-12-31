import express from "express"
import { getPaymasterForId, getPaymastersOnChainForApplication } from "../services"



const applicationName = (_req: express.Request, _res: express.Response) => {
    try {
        _res.setHeader("Content-Type", "application/json")
        _res.status(200).end(JSON.stringify({ app_name: "SPONSOR GAS BACKEND" }))
    } catch (error: any) {
        console.error(error)

        _res.status(500).end()
    }
}

const getPaymastersForApplicationAddressAndChainId = async (_req: express.Request, _res: express.Response) => {
	try {
			console.log(`getPaymastersForApplicationAndChain ${_req.params}`)
			const applicationContractAddress = _req.params.application_contract_address
			const chainId = _req.params.chainId
			if(chainId && applicationContractAddress){
				const paymasters = await getPaymastersOnChainForApplication(chainId,applicationContractAddress)
				console.log("Paymasters for the application:", JSON.stringify(paymasters));
				_res.setHeader("Content-Type", "application/json")
				if (paymasters) {
					return _res.status(200).end(JSON.stringify({ paymasters }))
				} else {
					return _res.status(200).end(JSON.stringify({ paymasters:[] }))
				}
			}
			
	} catch (error: any) {
			console.error(error)
			_res.status(500).end()
	}
	_res.status(500).end()
}

const handlePaymasterById = async (_req: express.Request, _res: express.Response) => {
	try {
			console.log(`getPaymasterById ${_req.params}`)
			const id = _req.params.id
			if(id){
				const paymaster = await getPaymasterForId(id)
				console.log(`Paymasters for the id :${id}: ${JSON.stringify(paymaster)}`);
				_res.setHeader("Content-Type", "application/json")
				if (paymaster) {
					return _res.status(200).end(JSON.stringify({ paymaster }))
				} else {
					return _res.status(404).end()
				}
			}
			
	} catch (error: any) {
			console.error(error)
			_res.status(500).end()
	}
	_res.status(500).end()
}

export = {
    applicationName,
    getPaymastersForApplicationAddressAndChainId,
	handlePaymasterById
}
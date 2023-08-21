"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymasterApplicationsRegistry = exports.paymasterApplicationsRegistryABI = void 0;
const ethers_1 = require("ethers");
const config_1 = require("../../lib/config");
exports.paymasterApplicationsRegistryABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "applicationAddress",
                "type": "address"
            }
        ],
        "name": "ApplicationAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "applicationAddress",
                "type": "address"
            }
        ],
        "name": "ApplicationRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            }
        ],
        "name": "PaymasterRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            }
        ],
        "name": "PaymasterUnregistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "applicationAddress",
                "type": "address"
            }
        ],
        "name": "addApplicationToPaymaster",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "applicationAddress",
                "type": "address"
            }
        ],
        "name": "isApplicationSupported",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "paymastersMap",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            }
        ],
        "name": "registerPaymaster",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "applicationAddress",
                "type": "address"
            }
        ],
        "name": "removeApplicationFromPaymaster",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "paymasterAddress",
                "type": "address"
            }
        ],
        "name": "unregisterPaymaster",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
class PaymasterApplicationsRegistry {
    _paymasterApplicationsRegistry;
    /**
     * @notice Create PaymasterApplicationsRegistry instance to interact with
     * @param signerOrProvider signer or provider to use
     */
    constructor(signerOrProvider, chainId) {
        const registryContractAddress = (0, config_1.getPaymasterRegistryContractAddressByChainId)(chainId);
        if (registryContractAddress) {
            this._paymasterApplicationsRegistry = new ethers_1.Contract(registryContractAddress, exports.paymasterApplicationsRegistryABI, signerOrProvider);
        }
        else {
            throw new Error(`ChainId : ${chainId} not supported by paymaster registry`);
        }
    }
    async isPaymasterRegistered(paymasterAddress) {
        try {
            // Check the paymaster registration status
            const paymaster = await this._paymasterApplicationsRegistry.paymastersMap(paymasterAddress);
            return paymaster.isActive;
        }
        catch (err) {
            console.log(err);
        }
    }
    async registerPaymaster(paymasterAddress) {
        try {
            const tx = await this._paymasterApplicationsRegistry.registerPaymaster(paymasterAddress, 'HardcodedData');
            return await this.isPaymasterRegistered(paymasterAddress);
        }
        catch (err) {
            console.log(err);
        }
        return false;
    }
    async addApplicationSupportToPaymaster(paymasterAddress, applicationAddress) {
        try {
            const tx = await this._paymasterApplicationsRegistry.addApplicationToPaymaster(paymasterAddress, applicationAddress);
            console.log(tx);
            return await this.isApplicationSupported(paymasterAddress, applicationAddress);
        }
        catch (err) {
            console.log(err);
        }
        return false;
    }
    async isApplicationSupported(paymasterAddress, applicationAddress) {
        try {
            // Check if the application is supported by the paymaster
            const isSupported = await this._paymasterApplicationsRegistry.isApplicationSupported(paymasterAddress, applicationAddress);
            return isSupported;
        }
        catch (err) {
            console.log(err);
        }
        return false;
    }
    async getRegisteredPaymastersOnPaymasterRegistry() {
        try {
            const filter = this._paymasterApplicationsRegistry.filters.PaymasterRegistered();
            const paymasterRegisteredEvents = await this._paymasterApplicationsRegistry.queryFilter(filter);
            const provider = this._paymasterApplicationsRegistry.provider;
            // console.log(paymasterRegisteredEvents)
            const paymasters = await Promise.all(paymasterRegisteredEvents.map(async (paymasterRegistered) => {
                const transaction = await provider.getTransaction(paymasterRegistered.transactionHash);
                const emittingAccount = transaction.from;
                const block = await provider.getBlock(transaction.blockHash);
                const timestamp = block.timestamp;
                return {
                    'id': paymasterRegistered.args[0],
                    'name': `HardCorded ${paymasterRegistered.args[0]} `,
                    'type': '',
                    'published': true,
                    'description': '',
                    'createdAt': new Date(timestamp),
                    'ownerId': `${emittingAccount}`,
                    'chainId': `${(await provider.getNetwork()).chainId}`,
                    "paymasterAddress": paymasterRegistered.args[0],
                    "paymasterOffchainService": `https://sponsor-gas-backend.vercel.app/api/paymasters/${paymasterRegistered.args[0]}`
                    // "pyamasterMetadata":paymasterRegistered.args[1]
                    // "applications": await this.getSupportedApplications(paymasterRegistered.args[0])
                };
            }));
            return paymasters;
        }
        catch (error) {
            console.error('Error fetching announcements:', error);
        }
        return [];
    }
    async getSupportedApplications(paymasterAddress) {
        try {
            const filter = this._paymasterApplicationsRegistry.filters.ApplicationAdded(paymasterAddress);
            const applicationAddedEvents = await this._paymasterApplicationsRegistry.queryFilter(filter);
            console.log(applicationAddedEvents);
            // if(applicationAddedEvents.length === 0) return []
            return applicationAddedEvents.map(applicationAdded => applicationAdded.args[1]) || [];
        }
        catch (error) {
            console.error('Error fetching announcements:', error);
        }
        return [];
    }
    async getSupportedPaymasterForApplication(applicationAddress) {
        try {
            const filter = this._paymasterApplicationsRegistry.filters.ApplicationAdded(null, applicationAddress); // paymasterAddress,appAddress
            const applicationAddedEvents = await this._paymasterApplicationsRegistry.queryFilter(filter);
            // console.log(applicationAddedEvents)
            const provider = this._paymasterApplicationsRegistry.provider;
            // if(applicationAddedEvents.length === 0) return []
            const paymasters = await Promise.all(applicationAddedEvents.map(async (applicationAdded) => {
                const transaction = await provider.getTransaction(applicationAdded.transactionHash);
                const emittingAccount = transaction.from;
                const block = await provider.getBlock(transaction.blockHash);
                const timestamp = block.timestamp;
                return {
                    'id': applicationAdded.args[0],
                    'name': `HardCorded ${applicationAdded.args[0]} `,
                    'type': '',
                    'published': true,
                    'description': '',
                    'createdAt': new Date(timestamp),
                    'ownerId': `${emittingAccount}`,
                    'chainId': `0x${((await provider.getNetwork()).chainId).toString(16)}`,
                    "paymasterAddress": applicationAdded.args[0],
                    "paymasterOffchainService": `https://sponsor-gas-backend.vercel.app/apipaymasters/${applicationAdded.args[0]}`
                    // "pyamasterMetadata":paymasterRegistered.args[1]
                };
            }));
            return paymasters;
        }
        catch (error) {
            console.error('Error fetching announcements:', error);
        }
        return [];
    }
}
exports.PaymasterApplicationsRegistry = PaymasterApplicationsRegistry;

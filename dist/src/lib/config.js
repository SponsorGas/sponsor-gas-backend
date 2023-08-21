"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainConfigForChainId = exports.getPimlicoChainNameByChainId = exports.getPaymasterRegistryContractAddressByChainId = exports.getEntryPointContractAddressByChainId = exports.getVerifyingPaymasterContractAddressByChainId = exports.isSupportedNetwork = exports.config = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.config = {
    '0xe704': {
        name: 'Goerli Linea',
        entryPointContractAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
        verifyingPaymasterContractAddress: '0xd6F6bA8025366300822Dae5008762074bC72F1B5',
        paymasterRegistryContractAddress: '',
        applications: [
            {
                applicationContractAddress: '0xea68b3efbbf63bb837f36a90aa97df27bbf9b864',
                name: 'ETHGlobal Staking'
            }
        ],
        symbol: 'BaseETH',
        pimlicoChainValue: 'base-goerli',
        blockExplorer: 'https://goerli.lineascan.build/',
        rpcUrl: 'https://rpc.goerli.linea.build',
    },
    '0x14a33': {
        name: 'Goerli Base',
        entryPointContractAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
        verifyingPaymasterContractAddress: '0xe6e61b4cb54ecfc67421b61bcdc5a566d91888ae',
        paymasterRegistryContractAddress: '0x36d07d0b52eab491d714732c7cc79dc39e3ab373',
        applications: [
            {
                applicationContractAddress: '0x7f829ab036fa3ac32928910152c78d93038dc3e2',
                name: 'ETHGlobal Staking'
            }
        ],
        symbol: 'BaseETH',
        pimlicoChainValue: 'base-goerli',
        blockExplorer: 'https://goerli.basescan.org',
        rpcUrl: 'https://goerli.base.org',
    },
    '0x1a4': {
        name: 'Goerli Optimism',
        entryPointContractAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
        verifyingPaymasterContractAddress: '0xe9866c87082bac6a08a1f7cbbc2697d137fc5dfc',
        paymasterRegistryContractAddress: '0x44d65c8be690325059dbe4fe11c96440d1400efc',
        applications: [
            {
                applicationContractAddress: '0xe6e61b4cb54ecfc67421b61bcdc5a566d91888ae',
                name: 'ETHGlobal Staking'
            }
        ],
        symbol: 'OptimismETH',
        pimlicoChainValue: 'optimism-goerli',
        blockExplorer: 'https://goerli-optimism.etherscan.io',
        rpcUrl: process.env.OPTIMISM_GOERLI_RPC,
    }
};
const isSupportedNetwork = (id) => {
    if (!id) {
        return false;
    }
    const isHexChain = id.startsWith('0x');
    const networkId = isHexChain ? id : `0x${Number(id).toString(16)}`;
    return !!(networkId in exports.config);
};
exports.isSupportedNetwork = isSupportedNetwork;
const getVerifyingPaymasterContractAddressByChainId = (chainId) => {
    const chainConfig = exports.config[chainId];
    if (chainConfig && (0, exports.isSupportedNetwork)(chainId)) {
        return chainConfig.verifyingPaymasterContractAddress;
    }
    else {
        return ''; // Chain ID not found in config
    }
};
exports.getVerifyingPaymasterContractAddressByChainId = getVerifyingPaymasterContractAddressByChainId;
const getEntryPointContractAddressByChainId = (chainId) => {
    const chainConfig = exports.config[chainId];
    if (chainConfig && (0, exports.isSupportedNetwork)(chainId)) {
        return chainConfig.entryPointContractAddress;
    }
    else {
        return ''; // Chain ID not found in config
    }
};
exports.getEntryPointContractAddressByChainId = getEntryPointContractAddressByChainId;
const getPaymasterRegistryContractAddressByChainId = (chainId) => {
    const chainConfig = exports.config[chainId];
    if (chainConfig && (0, exports.isSupportedNetwork)(chainId)) {
        return chainConfig.paymasterRegistryContractAddress;
    }
    else {
        return ''; // Chain ID not found in config
    }
};
exports.getPaymasterRegistryContractAddressByChainId = getPaymasterRegistryContractAddressByChainId;
const getPimlicoChainNameByChainId = (chainId) => {
    const chainConfig = exports.config[chainId];
    if (chainConfig && (0, exports.isSupportedNetwork)(chainId)) {
        return chainConfig.pimlicoChainValue;
    }
    else {
        return ''; // Chain ID not found in config
    }
};
exports.getPimlicoChainNameByChainId = getPimlicoChainNameByChainId;
const getChainConfigForChainId = (chainId) => {
    const chainConfig = exports.config[chainId];
    if (chainConfig && (0, exports.isSupportedNetwork)(chainId)) {
        return chainConfig;
    }
};
exports.getChainConfigForChainId = getChainConfigForChainId;

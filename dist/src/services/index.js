"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesUserHoldNFT = exports.getPaymasterCriteriaById = exports.getPaymasterCriteriaForPaymasterId = exports.getPaymasterForId = exports.getPaymaster = exports.getPaymastersOnChainForApplication = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const ethers_1 = require("ethers");
const config_1 = require("../lib/config");
const web3_storage_1 = require("web3.storage");
const getPaymastersOnChainForApplication = async (chainId, applicationAddress) => {
    const paymastersOnChainForApplication = await prisma_1.default.paymaster.findMany({
        where: {
            applications: {
                some: {
                    AND: [
                        { value: applicationAddress },
                        { chain: { chainId: chainId } },
                    ],
                },
            },
        },
        include: {
            PaymasterCriteria: true
        },
    });
    let paymasters = paymastersOnChainForApplication;
    const client = new web3_storage_1.Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY });
    paymasters = await Promise.all(paymasters.map(async (p) => {
        if (p.image) {
            try {
                const imageFileResponse = await client.get(p.image);
                if (imageFileResponse) {
                    const files = await imageFileResponse.files();
                    const imageFile = await files[0];
                    const imageURL = `https://${imageFile.cid}.ipfs.w3s.link`;
                    p.image = imageURL;
                }
            }
            catch (e) {
                console.log('catught error');
                console.error(e);
                p.image = undefined;
            }
        }
        return p;
    }));
    return paymasters;
    // const provider = new ethers.providers.JsonRpcProvider(getChainConfigForChainId(chainId)?.rpcUrl)
    // const paymasterApplicationsRegistry:PaymasterApplicationsRegistry = new PaymasterApplicationsRegistry(provider,chainId)
    // const paymastersFromContracts = await paymasterApplicationsRegistry.getSupportedPaymasterForApplication(applicationAddress)
    // return paymastersOnChainForApplication // .concat(paymastersFromContracts)
};
exports.getPaymastersOnChainForApplication = getPaymastersOnChainForApplication;
const getPaymaster = async (chainId, paymasterAddress, paymasterId) => {
    const paymaster = await prisma_1.default.paymaster.findFirst({
        where: {
            id: paymasterId,
            chainId: chainId,
            paymasterAddress: paymasterAddress,
        },
    });
    return paymaster;
};
exports.getPaymaster = getPaymaster;
const getPaymasterForId = async (paymasterId) => {
    const paymaster = await prisma_1.default.paymaster.findFirst({
        where: {
            id: paymasterId
        },
        include: { PaymasterCriteria: true }
    });
    const client = new web3_storage_1.Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY });
    if (paymaster && paymaster.image) {
        try {
            const imageFileResponse = await client.get(paymaster.image);
            if (imageFileResponse) {
                const files = await imageFileResponse.files();
                const imageFile = await files[0];
                const imageURL = `https://${imageFile.cid}.ipfs.w3s.link`;
                paymaster.image = imageURL;
            }
        }
        catch (e) {
            console.log('caught error');
            console.error(e);
            paymaster.image = undefined;
        }
    }
    return paymaster;
};
exports.getPaymasterForId = getPaymasterForId;
const getPaymasterCriteriaForPaymasterId = async (paymasterId) => {
    const paymasterCriteria = await prisma_1.default.paymasterCriteria.findMany({
        where: {
            paymasterId: paymasterId,
        },
    });
    const criteriaWithTypeAndValue = paymasterCriteria.map(criteria => {
        if (criteria.type === 'video_challenge') {
            return { type: 'video_challenge', value: criteria.video };
        }
        else if (criteria.type === 'question_challenge') {
            return { type: 'question_challenge', value: criteria.id };
        }
        else if (criteria.type === 'identity_challenge') {
            return { type: 'identity_challenge', value: criteria.identityProvider };
        }
        else if (criteria.type === 'nft_challenge') {
            return { type: 'nft_challenge', value: criteria.nftCollection };
        }
        return { type: 'unknown', value: null }; // Handle unknown criteria types if needed
    });
    return criteriaWithTypeAndValue;
};
exports.getPaymasterCriteriaForPaymasterId = getPaymasterCriteriaForPaymasterId;
const getPaymasterCriteriaById = async (criteriaId) => {
    try {
        const paymasterCriteria = await prisma_1.default.paymasterCriteria.findUnique({
            where: {
                id: criteriaId,
            },
        });
        if (!paymasterCriteria) {
            throw new Error('Paymaster criteria not found');
        }
        return paymasterCriteria;
    }
    catch (error) {
        throw new Error('Error fetching paymaster criteria');
    }
};
exports.getPaymasterCriteriaById = getPaymasterCriteriaById;
const doesUserHoldNFT = async (userAddress, nftContractAddress, chainId) => {
    const rpcURL = (0, config_1.getChainConfigForChainId)(chainId)?.rpcUrl;
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcURL);
    const nftContract = new ethers_1.ethers.Contract(nftContractAddress, ['function balanceOf(address owner) view returns (uint256)'], provider);
    try {
        const balance = await nftContract.balanceOf(userAddress);
        return balance.gt(0); // If balance is greater than 0, the user holds the NFT
    }
    catch (error) {
        console.error('Error:', error);
        return false;
    }
};
exports.doesUserHoldNFT = doesUserHoldNFT;

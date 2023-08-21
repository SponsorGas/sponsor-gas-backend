"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = exports.isJSONString = exports.formatAddress = exports.formatChainAsNum = exports.formatBalance = void 0;
const ethers_1 = require("ethers");
const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
    return balance;
};
exports.formatBalance = formatBalance;
const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
};
exports.formatChainAsNum = formatChainAsNum;
const formatAddress = (addr) => {
    return `${addr.substring(0, 5)}...${addr.substring(39)}`;
};
exports.formatAddress = formatAddress;
const isJSONString = (str) => {
    try {
        JSON.parse(str);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isJSONString = isJSONString;
const isAddress = (address) => {
    return ethers_1.ethers.utils.isAddress(address);
};
exports.isAddress = isAddress;

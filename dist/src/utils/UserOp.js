"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedUserOpWithPaymasterData = exports.fillAndSign = exports.fillUserOp = exports.fillUserOpDefaults = exports.signUserOp = exports.DefaultsForUserOp = exports.getUserOpHash = exports.packUserOp1 = exports.packUserOp = void 0;
const utils_1 = require("ethers/lib/utils");
const ethers_1 = require("ethers");
const testutils_1 = require("./testutils");
const ethereumjs_util_1 = require("ethereumjs-util");
const typechain_types_1 = require("./typechain-types");
const Create2Factory_1 = require("./helpers/Create2Factory");
const config_1 = require("../lib/config");
function packUserOp(op, forSignature = true) {
    if (forSignature) {
        return utils_1.defaultAbiCoder.encode(['address', 'uint256', 'bytes32', 'bytes32',
            'uint256', 'uint256', 'uint256', 'uint256', 'uint256',
            'bytes32'], [op.sender, op.nonce, (0, utils_1.keccak256)(op.initCode), (0, utils_1.keccak256)(op.callData),
            op.callGasLimit, op.verificationGasLimit, op.preVerificationGas, op.maxFeePerGas, op.maxPriorityFeePerGas,
            (0, utils_1.keccak256)(op.paymasterAndData)]);
    }
    else {
        // for the purpose of calculating gas cost encode also signature (and no keccak of bytes)
        return utils_1.defaultAbiCoder.encode(['address', 'uint256', 'bytes', 'bytes',
            'uint256', 'uint256', 'uint256', 'uint256', 'uint256',
            'bytes', 'bytes'], [op.sender, op.nonce, op.initCode, op.callData,
            op.callGasLimit, op.verificationGasLimit, op.preVerificationGas, op.maxFeePerGas, op.maxPriorityFeePerGas,
            op.paymasterAndData, op.signature]);
    }
}
exports.packUserOp = packUserOp;
function packUserOp1(op) {
    return utils_1.defaultAbiCoder.encode([
        'address',
        'uint256',
        'bytes32',
        'bytes32',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'bytes32' // paymasterAndData
    ], [
        op.sender,
        op.nonce,
        (0, utils_1.keccak256)(op.initCode),
        (0, utils_1.keccak256)(op.callData),
        op.callGasLimit,
        op.verificationGasLimit,
        op.preVerificationGas,
        op.maxFeePerGas,
        op.maxPriorityFeePerGas,
        (0, utils_1.keccak256)(op.paymasterAndData)
    ]);
}
exports.packUserOp1 = packUserOp1;
function getUserOpHash(op, entryPoint, chainId) {
    const userOpHash = (0, utils_1.keccak256)(packUserOp(op, true));
    const enc = utils_1.defaultAbiCoder.encode(['bytes32', 'address', 'uint256'], [userOpHash, entryPoint, chainId]);
    return (0, utils_1.keccak256)(enc);
}
exports.getUserOpHash = getUserOpHash;
exports.DefaultsForUserOp = {
    sender: testutils_1.AddressZero,
    nonce: 0,
    initCode: '0x',
    callData: '0x',
    callGasLimit: 0,
    verificationGasLimit: 150000,
    preVerificationGas: 21000,
    maxFeePerGas: 0,
    maxPriorityFeePerGas: 1e9,
    paymasterAndData: '0x',
    signature: '0x'
};
function signUserOp(op, signer, entryPoint, chainId) {
    const message = getUserOpHash(op, entryPoint, chainId);
    const msg1 = Buffer.concat([
        Buffer.from('\x19Ethereum Signed Message:\n32', 'ascii'),
        Buffer.from((0, utils_1.arrayify)(message))
    ]);
    const sig = (0, ethereumjs_util_1.ecsign)((0, ethereumjs_util_1.keccak256)(msg1), Buffer.from((0, utils_1.arrayify)(signer.privateKey)));
    // that's equivalent of:  await signer.signMessage(message);
    // (but without "async"
    const signedMessage1 = (0, ethereumjs_util_1.toRpcSig)(sig.v, sig.r, sig.s);
    return {
        ...op,
        signature: signedMessage1
    };
}
exports.signUserOp = signUserOp;
function fillUserOpDefaults(op, defaults = exports.DefaultsForUserOp) {
    const partial = { ...op };
    // we want "item:undefined" to be used from defaults, and not override defaults, so we must explicitly
    // remove those so "merge" will succeed.
    for (const key in partial) {
        if (partial[key] == null) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete partial[key];
        }
    }
    const filled = { ...defaults, ...partial };
    return filled;
}
exports.fillUserOpDefaults = fillUserOpDefaults;
// helper to fill structure:
// - default callGasLimit to estimate call from entryPoint to account (TODO: add overhead)
// if there is initCode:
//  - calculate sender by eth_call the deployment code
//  - default verificationGasLimit estimateGas of deployment code plus default 100000
// no initCode:
//  - update nonce from account.getNonce()
// entryPoint param is only required to fill in "sender address when specifying "initCode"
// nonce: assume contract as "getNonce()" function, and fill in.
// sender - only in case of construction: fill sender from initCode.
// callGasLimit: VERY crude estimation (by estimating call to account, and add rough entryPoint overhead
// verificationGasLimit: hard-code default at 100k. should add "create2" cost
async function fillUserOp(op, entryPoint, getNonceFunction = 'getNonce') {
    const op1 = { ...op };
    const provider = entryPoint?.provider;
    if (op.initCode != null) {
        console.log(`op.initCode !== null`);
        const initAddr = (0, utils_1.hexDataSlice)(op1.initCode, 0, 20);
        const initCallData = (0, utils_1.hexDataSlice)(op1.initCode, 20);
        if (op1.nonce == null)
            op1.nonce = 0;
        if (op1.sender == null) {
            // hack: if the init contract is our known deployer, then we know what the address would be, without a view call
            if (initAddr.toLowerCase() === Create2Factory_1.Create2Factory.contractAddress.toLowerCase()) {
                const ctr = (0, utils_1.hexDataSlice)(initCallData, 32);
                const salt = (0, utils_1.hexDataSlice)(initCallData, 0, 32);
                op1.sender = Create2Factory_1.Create2Factory.getDeployedAddress(ctr, salt);
            }
            else {
                console.log('\t== not our deployer. our=', Create2Factory_1.Create2Factory.contractAddress, 'got', initAddr);
                if (provider == null)
                    throw new Error('no entrypoint/provider');
                op1.sender = await entryPoint.callStatic.getSenderAddress(op1.initCode).catch(e => e.errorArgs.sender);
            }
        }
        if (op1.verificationGasLimit == null) {
            if (provider == null)
                throw new Error('no entrypoint/provider');
            const initEstimate = await provider.estimateGas({
                from: entryPoint?.address,
                to: initAddr,
                data: initCallData,
                gasLimit: 10e6
            });
            op1.verificationGasLimit = ethers_1.BigNumber.from(exports.DefaultsForUserOp.verificationGasLimit).add(initEstimate);
        }
    }
    console.log(`Checking Nonce ${op.sender}`);
    if (op1.nonce == null) {
        if (provider == null)
            throw new Error('must have entryPoint to autofill nonce');
        const c = new ethers_1.Contract(op.sender, [`function ${getNonceFunction}() view returns(uint256)`], provider);
        op1.nonce = await c[getNonceFunction]().catch((0, testutils_1.rethrow)());
    }
    console.log(`Checking callGasLimit`);
    if (op1.callGasLimit == null && op.callData != null) {
        if (provider == null)
            throw new Error('must have entryPoint for callGasLimit estimate');
        const gasEtimated = await provider.estimateGas({
            from: entryPoint?.address,
            to: op1.sender,
            data: op1.callData
        });
        // console.log('estim', op1.sender,'len=', op1.callData!.length, 'res=', gasEtimated)
        // estimateGas assumes direct call from entryPoint. add wrapper cost.
        op1.callGasLimit = gasEtimated; // .add(55000)
    }
    if (op1.maxFeePerGas == null) {
        if (provider == null)
            throw new Error('must have entryPoint to autofill maxFeePerGas');
        const block = await provider.getBlock('latest');
        op1.maxFeePerGas = block.baseFeePerGas.add(op1.maxPriorityFeePerGas ?? exports.DefaultsForUserOp.maxPriorityFeePerGas);
    }
    // TODO: this is exactly what fillUserOp below should do - but it doesn't.
    // adding this manually
    if (op1.maxPriorityFeePerGas == null) {
        op1.maxPriorityFeePerGas = exports.DefaultsForUserOp.maxPriorityFeePerGas;
    }
    const op2 = fillUserOpDefaults(op1);
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (op2.preVerificationGas.toString() === '0') {
        // TODO: we don't add overhead, which is ~21000 for a single TX, but much lower in a batch.
        op2.preVerificationGas = (0, testutils_1.callDataCost)(packUserOp(op2, false));
    }
    return op2;
}
exports.fillUserOp = fillUserOp;
async function fillAndSign(op, signer, entryPoint, getNonceFunction = 'getNonce') {
    const provider = entryPoint?.provider;
    const op2 = await fillUserOp(op, entryPoint, getNonceFunction);
    const chainId = await provider.getNetwork().then(net => net.chainId);
    const message = (0, utils_1.arrayify)(getUserOpHash(op2, entryPoint.address, chainId));
    return {
        ...op2,
        signature: await signer.signMessage(message)
    };
}
exports.fillAndSign = fillAndSign;
async function getSignedUserOpWithPaymasterData(userOperation, chainId, entryPointAddress, getNonceFunction = 'getNonce') {
    if (!(0, config_1.isSupportedNetwork)(chainId)) {
        throw new Error(`${chainId} not supported`);
    }
    const verifyingPaymasterContractAddress = (0, config_1.getVerifyingPaymasterContractAddressByChainId)(chainId);
    const paymasterSigner = chainId === '0xe704'
        ? new ethers_1.ethers.Wallet(process.env.LINEA_PAYMASTER_SIGNER_KEY)
        : new ethers_1.ethers.Wallet(process.env.PAYMASTERSIGNER_PRIVATE_KEY);
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.config[chainId].rpcUrl);
    const entryPoint = typechain_types_1.EntryPoint__factory.connect(entryPointAddress, provider);
    const op2 = await fillUserOp(userOperation, entryPoint, getNonceFunction);
    console.log("After FillUserOp");
    console.log(op2);
    // console.log(Math.round(Date.now()/1000+100000))
    const MOCK_VALID_AFTER = 0;
    const MOCK_VALID_UNTIL = ethers_1.ethers.utils.hexlify(Math.round(Date.now() / 1000 + 100000));
    // const MOCK_VALID_UNTIL = 1691804634
    const paymaster = typechain_types_1.VerifyingPaymaster__factory.connect(verifyingPaymasterContractAddress, provider);
    op2.paymasterAndData = (0, utils_1.hexConcat)([paymaster.address, utils_1.defaultAbiCoder.encode(['uint48', 'uint48'], [MOCK_VALID_UNTIL, MOCK_VALID_AFTER]), '0x' + '00'.repeat(65)]);
    const hash = await paymaster.getHash(op2, MOCK_VALID_UNTIL, MOCK_VALID_AFTER);
    console.log("Hash:", hash);
    const sig = await paymasterSigner.signMessage((0, utils_1.arrayify)(hash));
    console.log("Paymaster Signature : ", sig);
    console.log(ethers_1.ethers.utils.verifyMessage((0, utils_1.arrayify)(hash), sig));
    console.log(`Paymaster Signer Address : ${paymasterSigner.address}`);
    return {
        ...op2,
        paymasterAndData: (0, utils_1.hexConcat)([paymaster.address, utils_1.defaultAbiCoder.encode(['uint48', 'uint48'], [MOCK_VALID_UNTIL, MOCK_VALID_AFTER]), sig])
    };
}
exports.getSignedUserOpWithPaymasterData = getSignedUserOpWithPaymasterData;

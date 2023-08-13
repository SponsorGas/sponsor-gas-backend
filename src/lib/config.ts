const dotenv = require('dotenv');
dotenv.config();

interface ApplicationConfig{
  applicationContractAddress:string
  name:string
}
interface ChainConfig {
  name: string;
  entryPointContractAddress:string;
  verifyingPaymasterContractAddress: string;
  paymasterRegistryContractAddress:string;
  applications: ApplicationConfig[];
  symbol: string;
  pimlicoChainValue:string;
  blockExplorer: string;
  rpcUrl: string;
}

interface Config {
  [key: string]: ChainConfig;
}

export const config: Config = {
  '0x14a33': {
    name: 'Goerli Base',
    entryPointContractAddress:'0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    verifyingPaymasterContractAddress: '0xe6e61b4cb54ecfc67421b61bcdc5a566d91888ae',
    paymasterRegistryContractAddress:'0x36d07d0b52eab491d714732c7cc79dc39e3ab373',
    applications:[
      {
        applicationContractAddress:'0x7f829ab036fa3ac32928910152c78d93038dc3e2',
        name:'ETHGlobal Staking'
      }],
    symbol: 'BaseETH',
    pimlicoChainValue:'base-goerli',
    blockExplorer: 'https://goerli.basescan.org',
    rpcUrl: 'https://goerli.base.org',
  },
  '0x1a4': {
    name: 'Goerli Optimism',
    entryPointContractAddress:'0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    verifyingPaymasterContractAddress: '0xe9866c87082bac6a08a1f7cbbc2697d137fc5dfc',
    paymasterRegistryContractAddress:'0x44d65c8be690325059dbe4fe11c96440d1400efc',
    applications:[
      {
        applicationContractAddress:'0xe6e61b4cb54ecfc67421b61bcdc5a566d91888ae',
        name:'ETHGlobal Staking'
      }],
    symbol: 'OptimismETH',
    pimlicoChainValue:'optimism-goerli',
    blockExplorer: 'https://goerli-optimism.etherscan.io',
    rpcUrl: process.env.OPTIMISM_GOERLI_RPC!,
  }
}

export const isSupportedNetwork = (id: string) => {
  if (!id) {
    return false;
  }
  const isHexChain = id.startsWith('0x');
  const networkId = isHexChain ? id : `0x${Number(id).toString(16)}`;
  return !!(networkId in config );
}

export const getVerifyingPaymasterContractAddressByChainId = (chainId: string): string | undefined => {
  const chainConfig = config[chainId];
  if (chainConfig && isSupportedNetwork(chainId)) {
    return chainConfig.verifyingPaymasterContractAddress
  } else {
    return ''; // Chain ID not found in config
  }
}
export const getEntryPointContractAddressByChainId = (chainId: string): string | undefined => {
  const chainConfig = config[chainId];
  if (chainConfig && isSupportedNetwork(chainId)) {
    return chainConfig.entryPointContractAddress
  } else {
    return ''; // Chain ID not found in config
  }
}
export const getPaymasterRegistryContractAddressByChainId = (chainId: string): string | undefined => {
  const chainConfig = config[chainId];
  if (chainConfig && isSupportedNetwork(chainId)) {
    return chainConfig.paymasterRegistryContractAddress
  } else {
    return ''; // Chain ID not found in config
  }
}
export const getPimlicoChainNameByChainId = (chainId: string): string | undefined => {
  const chainConfig = config[chainId];
  if (chainConfig && isSupportedNetwork(chainId)) {
    return chainConfig.pimlicoChainValue
  } else {
    return ''; // Chain ID not found in config
  }
}
export const getChainConfigForChainId = (chainId: string): ChainConfig | undefined=> {
  const chainConfig = config[chainId];
  if (chainConfig && isSupportedNetwork(chainId)) {
    return chainConfig;
  } 
}
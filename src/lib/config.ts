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
    verifyingPaymasterContractAddress: '',
    paymasterRegistryContractAddress:'',
    applications:[
      {
        applicationContractAddress:'',
        name:'ETHGlobal Staking'
      }],
    symbol: 'BaseETH',
    pimlicoChainValue:'',
    blockExplorer: 'https://goerli.basescan.org',
    rpcUrl: 'https://goerli.base.org',
  },
  '0x1a4': {
    name: 'Goerli Optimism',
    entryPointContractAddress:'0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    verifyingPaymasterContractAddress: '0xE9866C87082Bac6a08a1F7CbBc2697d137fC5dfc',
    paymasterRegistryContractAddress:'0x44d65c8be690325059DBe4Fe11c96440d1400EFc',
    applications:[
      {
        applicationContractAddress:'0xe6E61B4CB54Ecfc67421b61BCdC5a566d91888Ae',
        name:'ETHGlobal Staking'
      }],
    symbol: 'OptimismETH',
    pimlicoChainValue:'',
    blockExplorer: 'https://goerli-optimism.etherscan.io',
    rpcUrl: process.env.OPRIMISM_GOERLI_RPC!,
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
export const getChainConfigForChainId = (chainId: string): ChainConfig | undefined=> {
  const chainConfig = config[chainId];
  if (chainConfig && isSupportedNetwork(chainId)) {
    return chainConfig;
  } 
}
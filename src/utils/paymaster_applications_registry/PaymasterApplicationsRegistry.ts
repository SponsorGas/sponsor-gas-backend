import { Contract,  } from "ethers";
import { PaymasterApplicationsRegistry as Registry } from "../typechain-types";
import { JsonRpcSigner, StaticJsonRpcProvider,  Web3Provider,} from '@ethersproject/providers';
import { getPaymasterRegistryContractAddressByChainId } from "../../lib/config";
import { Paymaster } from "../../model/SponsorGas";

export const paymasterApplicationsRegistryABI =  [
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
 

export class PaymasterApplicationsRegistry {
    readonly _paymasterApplicationsRegistry: Registry;
    /**
     * @notice Create PaymasterApplicationsRegistry instance to interact with
     * @param signerOrProvider signer or provider to use
     */
    constructor(signerOrProvider: JsonRpcSigner | Web3Provider | StaticJsonRpcProvider, chainId:string ) {
      const registryContractAddress = getPaymasterRegistryContractAddressByChainId(chainId)
      if(registryContractAddress){
        this._paymasterApplicationsRegistry = new Contract(registryContractAddress, paymasterApplicationsRegistryABI, signerOrProvider) as unknown as Registry;
      }else{
        throw new Error(`ChainId : ${chainId} not supported by paymaster registry`)
      }
    }

    async isPaymasterRegistered(paymasterAddress:string){
        try{
            // Check the paymaster registration status
            const paymaster = await this._paymasterApplicationsRegistry.paymastersMap(paymasterAddress);
            return paymaster.isActive
        }catch(err){
            console.log(err)
        }
    }

    async registerPaymaster(paymasterAddress:string){
        try{
            const tx = await this._paymasterApplicationsRegistry.registerPaymaster(paymasterAddress,'HardcodedData');
            return await this.isPaymasterRegistered(paymasterAddress)
        }catch(err){
            console.log(err)
        }
        return false;
    }

    async addApplicationSupportToPaymaster(paymasterAddress:string,applicationAddress:string){
        try{
            const tx = await this._paymasterApplicationsRegistry.addApplicationToPaymaster(paymasterAddress,applicationAddress);
            console.log(tx)
            return await this.isApplicationSupported(paymasterAddress,applicationAddress)
        }catch(err){
            console.log(err)
        }
        return false;
    }

    async isApplicationSupported(paymasterAddress:string,applicationAddress:string) {
      try{
          // Check if the application is supported by the paymaster
          const isSupported = await this._paymasterApplicationsRegistry.isApplicationSupported(paymasterAddress, applicationAddress);
          return isSupported
      }catch(err){
          console.log(err)
      }
      return false
    }


    async getRegisteredPaymastersOnPaymasterRegistry() {
      try{
          const filter = this._paymasterApplicationsRegistry.filters.PaymasterRegistered();
          const paymasterRegisteredEvents = await this._paymasterApplicationsRegistry.queryFilter(filter);
          const provider = this._paymasterApplicationsRegistry.provider
          // console.log(paymasterRegisteredEvents)
          const paymasters : Paymaster[] = await Promise.all(
          paymasterRegisteredEvents.map(async (paymasterRegistered) => {
              const transaction = await provider!.getTransaction(paymasterRegistered.transactionHash);
              const emittingAccount = transaction.from;
              const block = await provider!.getBlock(transaction.blockHash!);
              const timestamp = block.timestamp;
              return {
                    'id':paymasterRegistered.args[0],
                    'name':`HardCorded ${paymasterRegistered.args[0]} `,
                    'type':'',
                    'published':true,
                    'description':'',
                    'createdAt': new Date(timestamp), 
                    'ownerId':`${emittingAccount}`,
                    'chainId':`${(await provider.getNetwork()).chainId}`,
                    "paymasterAddress":paymasterRegistered.args[0],
                    "paymasterOffchainService":`http://localhost:8001/api/paymasters/${paymasterRegistered.args[0]}`
                  // "pyamasterMetadata":paymasterRegistered.args[1]
                  // "applications": await this.getSupportedApplications(paymasterRegistered.args[0])
              }
          })
          )
          return paymasters;
      } catch (error) {
          console.error('Error fetching announcements:', error);
      }
            
      return []
  }

  async getSupportedApplications(paymasterAddress:string) {
      try{
          const filter = this._paymasterApplicationsRegistry.filters.ApplicationAdded(paymasterAddress);
          const applicationAddedEvents = await this._paymasterApplicationsRegistry.queryFilter(filter);
          console.log(applicationAddedEvents)
          // if(applicationAddedEvents.length === 0) return []
          return applicationAddedEvents.map(applicationAdded => applicationAdded.args[1]) || []
      } catch (error) {
          console.error('Error fetching announcements:', error);
      }
      return []
  }

  async getSupportedPaymasterForApplication(applicationAddress:string) {
    try{
        const filter = this._paymasterApplicationsRegistry.filters.ApplicationAdded(null,applicationAddress); // paymasterAddress,appAddress
        const applicationAddedEvents = await this._paymasterApplicationsRegistry.queryFilter(filter);
        // console.log(applicationAddedEvents)
        const provider = this._paymasterApplicationsRegistry.provider
        // if(applicationAddedEvents.length === 0) return []
          const paymasters : Paymaster[] = await Promise.all(
            applicationAddedEvents.map(async applicationAdded => {
              const transaction = await provider!.getTransaction(applicationAdded.transactionHash);
              const emittingAccount = transaction.from;
              const block = await provider!.getBlock(transaction.blockHash!);
              const timestamp = block.timestamp;
              return {
                    'id':applicationAdded.args[0],
                    'name':`HardCorded ${applicationAdded.args[0]} `,
                    'type':'',
                    'published':true,
                    'description':'',
                    'createdAt': new Date(timestamp), 
                    'ownerId':`${emittingAccount}`,
                    'chainId':`0x${((await provider.getNetwork()).chainId).toString(16)}`,
                    "paymasterAddress":applicationAdded.args[0],
                    "paymasterOffchainService":`http://localhost:8001/api/paymasters/${applicationAdded.args[0]}`
                  // "pyamasterMetadata":paymasterRegistered.args[1]
              }
          }))
          return paymasters
    } catch (error) {
        console.error('Error fetching announcements:', error);
    }
    return []
}

   
  }
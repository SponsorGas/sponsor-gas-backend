import { PaymasterApplicationsRegistry } from "../utils/paymaster_applications_registry/PaymasterApplicationsRegistry";
import prisma from "../lib/prisma";
import {  Paymaster, PaymasterCriteria } from "../model/SponsorGas";
import { ethers } from "ethers";
import { getChainConfigForChainId } from "../lib/config";
import { Web3Storage } from "web3.storage";


export const getPaymastersOnChainForApplication = async (chainId:string,applicationAddress:string) =>{
    const paymastersOnChainForApplication : Paymaster[]= await prisma.paymaster.findMany({
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
            PaymasterCriteria:true
          },
    });

    let paymasters : Paymaster[] = paymastersOnChainForApplication
            const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY! })
            paymasters = await Promise.all(paymasters.map(async p => {
                if(p.image){
                    try{
                        const imageFileResponse = await client.get(p.image as string)
                        if(imageFileResponse){
                            const files = await imageFileResponse.files();
                            const imageFile = await files[0];
                            const imageURL = `https://${imageFile.cid}.ipfs.w3s.link`
                            p.image = imageURL
                        }
                    }
                    catch(e){
                        console.log('catught error')
                        console.error(e)
                        p.image = undefined
                    }
                    
                }
                return p
            }))
    return paymasters
    // const provider = new ethers.providers.JsonRpcProvider(getChainConfigForChainId(chainId)?.rpcUrl)
    // const paymasterApplicationsRegistry:PaymasterApplicationsRegistry = new PaymasterApplicationsRegistry(provider,chainId)
    // const paymastersFromContracts = await paymasterApplicationsRegistry.getSupportedPaymasterForApplication(applicationAddress)
    // return paymastersOnChainForApplication // .concat(paymastersFromContracts)
}
export const getPaymaster = async (chainId:string,paymasterAddress:string,paymasterId:string) =>{
    const paymaster: Paymaster | null = await prisma.paymaster.findFirst({
        where: {
          id: paymasterId,
          chainId: chainId,
          paymasterAddress: paymasterAddress,
        },
      });
   
    return paymaster
}

export const getPaymasterForId = async (paymasterId:string) =>{
    const paymaster: Paymaster | null = await prisma.paymaster.findFirst({
        where: {
          id: paymasterId
        },
        include:{PaymasterCriteria:true}
      });
      const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY! })
      if(paymaster && paymaster.image){
        try{
            const imageFileResponse = await client.get(paymaster.image as string)
            if(imageFileResponse){
                const files = await imageFileResponse.files();
                const imageFile = await files[0];
                const imageURL = `https://${imageFile.cid}.ipfs.w3s.link`
                paymaster.image = imageURL
            }
        }
        catch(e){
            console.log('caught error')
            console.error(e)
            paymaster.image = undefined
        }
        
    }
    return paymaster
}

export const getPaymasterCriteriaForPaymasterId = async (paymasterId: string): Promise<{ type: string, value: any }[]> => {
    const paymasterCriteria = await prisma.paymasterCriteria.findMany({
        where: {
            paymasterId: paymasterId,
        },
    });

    const criteriaWithTypeAndValue = paymasterCriteria.map(criteria => {
        if (criteria.type === 'video_challenge') {
            return { type: 'video_challenge', value: criteria.video };
        } else if (criteria.type === 'question_challenge') {
            return { type: 'question_challenge', value: criteria.id };
        } else if (criteria.type === 'identity_challenge') {
            return { type: 'identity_challenge', value: criteria.identityProvider };
        } else if (criteria.type === 'nft_challenge') {
            return { type: 'nft_challenge', value: criteria.nftCollection };
        }
        return { type: 'unknown', value: null }; // Handle unknown criteria types if needed
    });

    return criteriaWithTypeAndValue;
};

export const getPaymasterCriteriaById = async (criteriaId: string) => {
    try {
        const paymasterCriteria = await prisma.paymasterCriteria.findUnique({
            where: {
                id: criteriaId,
            },
        });

        if (!paymasterCriteria) {
            throw new Error('Paymaster criteria not found');
        }

        return paymasterCriteria;
    } catch (error) {
        throw new Error('Error fetching paymaster criteria');
    }
}

export const doesUserHoldNFT = async (userAddress:string, nftContractAddress:string, chainId:string) => {
    const rpcURL = getChainConfigForChainId(chainId)?.rpcUrl
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const nftContract = new ethers.Contract(nftContractAddress, ['function balanceOf(address owner) view returns (uint256)'], provider);
  
    try {
      const balance:ethers.BigNumber = await nftContract.balanceOf(userAddress);
      return balance.gt(0); // If balance is greater than 0, the user holds the NFT
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }





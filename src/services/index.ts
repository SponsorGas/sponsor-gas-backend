import { PaymasterApplicationsRegistry } from "../utils/paymaster_applications_registry/PaymasterApplicationsRegistry";
import prisma from "../lib/prisma";
import {  Paymaster, PaymasterCriteria } from "../model/SponsorGas";
import { ethers } from "ethers";
import { getChainConfigForChainId } from "../lib/config";


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
    });
    // const provider = new ethers.providers.JsonRpcProvider(getChainConfigForChainId(chainId)?.rpcUrl)
    // const paymasterApplicationsRegistry:PaymasterApplicationsRegistry = new PaymasterApplicationsRegistry(provider,chainId)
    // const paymastersFromContracts = await paymasterApplicationsRegistry.getSupportedPaymasterForApplication(applicationAddress)
    return paymastersOnChainForApplication // .concat(paymastersFromContracts)
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
      });
   
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




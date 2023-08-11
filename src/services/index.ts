import { PaymasterApplicationsRegistry } from "../utils/paymaster_applications_registry/PaymasterApplicationsRegistry";
import prisma from "../lib/prisma";
import {  Paymaster } from "../model/SponsorGas";
import { ethers } from "ethers";
import { getChainConfigForChainId, getPaymasterRegistryContractAddressByChainId } from "../lib/config";


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
    const provider = new ethers.providers.JsonRpcProvider(getChainConfigForChainId(chainId)?.rpcUrl)
    const paymasterApplicationsRegistry:PaymasterApplicationsRegistry = new PaymasterApplicationsRegistry(provider,chainId)
    const paymastersFromContracts = await paymasterApplicationsRegistry.getSupportedPaymasterForApplication(applicationAddress)
    return paymastersOnChainForApplication.concat(paymastersFromContracts)
}


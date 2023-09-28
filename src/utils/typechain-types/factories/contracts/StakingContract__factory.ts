/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  StakingContract,
  StakingContractInterface,
} from "../../contracts/StakingContract";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setStakingAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakedAmounts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052661550f7dca7000060015534801561001b57600080fd5b50600080546001600160a01b031916331790556104848061003d6000396000f3fe6080604052600436106100655760003560e01c80633f230872116100435780633f230872146100c9578063739a3e02146100e9578063f851a440146100ff57600080fd5b806310c1c1031461006a5780633a4b66f1146100aa5780633ccfd60b146100b4575b600080fd5b34801561007657600080fd5b506100976100853660046103b8565b60026020526000908152604090205481565b6040519081526020015b60405180910390f35b6100b2610151565b005b3480156100c057600080fd5b506100b261021c565b3480156100d557600080fd5b506100b26100e43660046103f5565b61030c565b3480156100f557600080fd5b5061009760015481565b34801561010b57600080fd5b5060005461012c9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100a1565b60015434146101c1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f496e636f7272656374207374616b696e6720616d6f756e74000000000000000060448201526064015b60405180910390fd5b33600090815260026020526040812080543492906101e090849061040e565b909155505060405134815233907febedb8b3c678666e7f36970bc8f57abf6d8fa2e828c0da91ea5b75bf68ed101a9060200160405180910390a2565b33600090815260026020526040902054610292576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f4e6f207374616b6520617661696c61626c65000000000000000000000000000060448201526064016101b8565b33600081815260026020526040808220805490839055905190929183156108fc02918491818181858888f193505050501580156102d3573d6000803e3d6000fd5b5060405181815233907f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659060200160405180910390a250565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103b3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4f6e6c792061646d696e2063616e2063616c6c20746869732066756e6374696f60448201527f6e0000000000000000000000000000000000000000000000000000000000000060648201526084016101b8565b600155565b6000602082840312156103ca57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146103ee57600080fd5b9392505050565b60006020828403121561040757600080fd5b5035919050565b80820180821115610448577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9291505056fea2646970667358221220ab43378fd14219c102deb6513f996ef179a0ea405d0ac03b90c21bcf8d1034fc64736f6c63430008100033";

type StakingContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakingContract__factory extends ContractFactory {
  constructor(...args: StakingContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StakingContract> {
    return super.deploy(overrides || {}) as Promise<StakingContract>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StakingContract {
    return super.attach(address) as StakingContract;
  }
  override connect(signer: Signer): StakingContract__factory {
    return super.connect(signer) as StakingContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingContractInterface {
    return new utils.Interface(_abi) as StakingContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingContract {
    return new Contract(address, _abi, signerOrProvider) as StakingContract;
  }
}

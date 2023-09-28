/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  VerifyingPaymaster,
  VerifyingPaymasterInterface,
} from "../../../../contracts/account_abstraction/samples/VerifyingPaymaster";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEntryPoint",
        name: "_entryPoint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_verifyingSigner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "unstakeDelaySec",
        type: "uint32",
      },
    ],
    name: "addStake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "entryPoint",
    outputs: [
      {
        internalType: "contract IEntryPoint",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeposit",
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
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
      {
        internalType: "uint48",
        name: "validUntil",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "validAfter",
        type: "uint48",
      },
    ],
    name: "getHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "bytes",
        name: "paymasterAndData",
        type: "bytes",
      },
    ],
    name: "parsePaymasterAndData",
    outputs: [
      {
        internalType: "uint48",
        name: "validUntil",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "validAfter",
        type: "uint48",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IPaymaster.PostOpMode",
        name: "mode",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "actualGasCost",
        type: "uint256",
      },
    ],
    name: "postOp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "senderNonce",
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
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "maxCost",
        type: "uint256",
      },
    ],
    name: "validatePaymasterUserOp",
    outputs: [
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyingSigner",
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
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address",
      },
    ],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620016fc380380620016fc8339810160408190526200003491620000c2565b81620000403362000059565b6001600160a01b039081166080521660a0525062000101565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620000bf57600080fd5b50565b60008060408385031215620000d657600080fd5b8251620000e381620000a9565b6020840151909250620000f681620000a9565b809150509250929050565b60805160a05161159d6200015f6000396000818161013f0152610c820152600081816102880152818161038601528181610450015281816105730152818161063a015281816106ca0152818161077d0152610a04015261159d6000f3fe6080604052600436106100f35760003560e01c8063a9a234091161008a578063c399ec8811610059578063c399ec88146102df578063d0e30db0146102f4578063f2fde38b146102fc578063f465c77e1461031c57600080fd5b8063a9a2340914610256578063b0d691fe14610276578063bb9fe6bf146102aa578063c23a5cea146102bf57600080fd5b80638da5cb5b116100c65780638da5cb5b146101a057806394d4ad60146101cb57806394e1fc19146101fb5780639c90b4431461022957600080fd5b80630396cb60146100f8578063205c28781461010d57806323d9ac9b1461012d578063715018a61461018b575b600080fd5b61010b610106366004611055565b61034a565b005b34801561011957600080fd5b5061010b6101283660046110a4565b6103fc565b34801561013957600080fd5b506101617f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b34801561019757600080fd5b5061010b610494565b3480156101ac57600080fd5b5060005473ffffffffffffffffffffffffffffffffffffffff16610161565b3480156101d757600080fd5b506101eb6101e6366004611112565b6104a8565b6040516101829493929190611154565b34801561020757600080fd5b5061021b6102163660046111f2565b6104e5565b604051908152602001610182565b34801561023557600080fd5b5061021b610244366004611250565b60016020526000908152604090205481565b34801561026257600080fd5b5061010b61027136600461126d565b61054f565b34801561028257600080fd5b506101617f000000000000000000000000000000000000000000000000000000000000000081565b3480156102b657600080fd5b5061010b610569565b3480156102cb57600080fd5b5061010b6102da366004611250565b6105ed565b3480156102eb57600080fd5b5061021b610699565b61010b61074f565b34801561030857600080fd5b5061010b610317366004611250565b6107d7565b34801561032857600080fd5b5061033c6103373660046112cd565b610893565b60405161018292919061137f565b6103526108b7565b6040517f0396cb6000000000000000000000000000000000000000000000000000000000815263ffffffff821660048201527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690630396cb609034906024016000604051808303818588803b1580156103e057600080fd5b505af11580156103f4573d6000803e3d6000fd5b505050505050565b6104046108b7565b6040517f205c287800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8381166004830152602482018390527f0000000000000000000000000000000000000000000000000000000000000000169063205c287890604401600060405180830381600087803b1580156103e057600080fd5b61049c6108b7565b6104a66000610938565b565b60008036816104bb6054601487896113a1565b8101906104c891906113cb565b90945092506104da85605481896113a1565b949793965094505050565b60006104f0846109ad565b73ffffffffffffffffffffffffffffffffffffffff85351660009081526001602090815260409182902054915161053093924692309289918991016113fe565b6040516020818303038152906040528051906020012090509392505050565b6105576109ec565b61056384848484610a8b565b50505050565b6105716108b7565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663bb9fe6bf6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156105d957600080fd5b505af1158015610563573d6000803e3d6000fd5b6105f56108b7565b6040517fc23a5cea00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82811660048301527f0000000000000000000000000000000000000000000000000000000000000000169063c23a5cea90602401600060405180830381600087803b15801561067e57600080fd5b505af1158015610692573d6000803e3d6000fd5b5050505050565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015610726573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074a919061145b565b905090565b6040517fb760faf90000000000000000000000000000000000000000000000000000000081523060048201527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063b760faf99034906024016000604051808303818588803b15801561067e57600080fd5b6107df6108b7565b73ffffffffffffffffffffffffffffffffffffffff8116610887576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61089081610938565b50565b6060600061089f6109ec565b6108aa858585610aed565b915091505b935093915050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146104a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161087e565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60603660006109c0610120850185611474565b915091508360208184030360405194506020810185016040528085528082602087013750505050919050565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146104a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f53656e646572206e6f7420456e747279506f696e740000000000000000000000604482015260640161087e565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f6d757374206f7665727269646500000000000000000000000000000000000000604482015260640161087e565b6060600080803681610b066101e66101208b018b611474565b929650909450925090506040811480610b1f5750604181145b610bad57604080517f08c379a00000000000000000000000000000000000000000000000000000000081526020600482015260248101919091527f566572696679696e675061796d61737465723a20696e76616c6964207369676e60448201527f6174757265206c656e67746820696e207061796d6173746572416e6444617461606482015260840161087e565b6000610bf0610bbd8b87876104e5565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000006000908152601c91909152603c902090565b73ffffffffffffffffffffffffffffffffffffffff8b35166000908152600160205260408120805492935090610c25836114d9565b9190505550610c6a8184848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610d1292505050565b73ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1614610ce757610cc860018686610d36565b60405180602001604052806000815250909650965050505050506108af565b610cf360008686610d36565b6040805160208101909152600081529b909a5098505050505050505050565b6000806000610d218585610d6e565b91509150610d2e81610db3565b509392505050565b600060d08265ffffffffffff16901b60a08465ffffffffffff16901b85610d5e576000610d61565b60015b60ff161717949350505050565b6000808251604103610da45760208301516040840151606085015160001a610d9887828585610f66565b94509450505050610dac565b506000905060025b9250929050565b6000816004811115610dc757610dc7611538565b03610dcf5750565b6001816004811115610de357610de3611538565b03610e4a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161087e565b6002816004811115610e5e57610e5e611538565b03610ec5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161087e565b6003816004811115610ed957610ed9611538565b03610890576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f7565000000000000000000000000000000000000000000000000000000000000606482015260840161087e565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115610f9d575060009050600361104c565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610ff1573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81166110455760006001925092505061104c565b9150600090505b94509492505050565b60006020828403121561106757600080fd5b813563ffffffff8116811461107b57600080fd5b9392505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461089057600080fd5b600080604083850312156110b757600080fd5b82356110c281611082565b946020939093013593505050565b60008083601f8401126110e257600080fd5b50813567ffffffffffffffff8111156110fa57600080fd5b602083019150836020828501011115610dac57600080fd5b6000806020838503121561112557600080fd5b823567ffffffffffffffff81111561113c57600080fd5b611148858286016110d0565b90969095509350505050565b600065ffffffffffff8087168352808616602084015250606060408301528260608301528284608084013760006080848401015260807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f850116830101905095945050505050565b600061016082840312156111d157600080fd5b50919050565b803565ffffffffffff811681146111ed57600080fd5b919050565b60008060006060848603121561120757600080fd5b833567ffffffffffffffff81111561121e57600080fd5b61122a868287016111be565b935050611239602085016111d7565b9150611247604085016111d7565b90509250925092565b60006020828403121561126257600080fd5b813561107b81611082565b6000806000806060858703121561128357600080fd5b84356003811061129257600080fd5b9350602085013567ffffffffffffffff8111156112ae57600080fd5b6112ba878288016110d0565b9598909750949560400135949350505050565b6000806000606084860312156112e257600080fd5b833567ffffffffffffffff8111156112f957600080fd5b611305868287016111be565b9660208601359650604090950135949350505050565b6000815180845260005b8181101561134157602081850181015186830182015201611325565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b604081526000611392604083018561131b565b90508260208301529392505050565b600080858511156113b157600080fd5b838611156113be57600080fd5b5050820193919092039150565b600080604083850312156113de57600080fd5b6113e7836111d7565b91506113f5602084016111d7565b90509250929050565b60c08152600061141160c083018961131b565b60208301979097525073ffffffffffffffffffffffffffffffffffffffff949094166040850152606084019290925265ffffffffffff90811660808401521660a090910152919050565b60006020828403121561146d57600080fd5b5051919050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126114a957600080fd5b83018035915067ffffffffffffffff8211156114c457600080fd5b602001915036819003821315610dac57600080fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611531577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220c05aabb539715aaf13d1c4d2a571f9d0787923c8c8e303f262161410a44d019964736f6c63430008100033";

type VerifyingPaymasterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VerifyingPaymasterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VerifyingPaymaster__factory extends ContractFactory {
  constructor(...args: VerifyingPaymasterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _entryPoint: PromiseOrValue<string>,
    _verifyingSigner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VerifyingPaymaster> {
    return super.deploy(
      _entryPoint,
      _verifyingSigner,
      overrides || {}
    ) as Promise<VerifyingPaymaster>;
  }
  override getDeployTransaction(
    _entryPoint: PromiseOrValue<string>,
    _verifyingSigner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _entryPoint,
      _verifyingSigner,
      overrides || {}
    );
  }
  override attach(address: string): VerifyingPaymaster {
    return super.attach(address) as VerifyingPaymaster;
  }
  override connect(signer: Signer): VerifyingPaymaster__factory {
    return super.connect(signer) as VerifyingPaymaster__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VerifyingPaymasterInterface {
    return new utils.Interface(_abi) as VerifyingPaymasterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VerifyingPaymaster {
    return new Contract(address, _abi, signerOrProvider) as VerifyingPaymaster;
  }
}

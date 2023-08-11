/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  VerifyingPaymaster,
  VerifyingPaymasterInterface,
} from "../../../../contracts/SponsorGasPaymaster/samples/VerifyingPaymaster";

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
      {
        internalType: "bytes",
        name: "_paymasterMetadataCID",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "_cid",
        type: "bytes",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
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
    name: "metadataCID",
    outputs: [
      {
        internalType: "bytes",
        name: "_cid",
        type: "bytes",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        internalType: "bytes",
        name: "_paymasterMetadataCID",
        type: "bytes",
      },
    ],
    name: "updateMetadataCID",
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
  "0x60c06040523480156200001157600080fd5b5060405162001de338038062001de38339810160408190526200003491620000ea565b8262000040336200006b565b6001600160a01b03908116608052821660a052600162000061828262000279565b5050505062000345565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620000d157600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200010057600080fd5b83516200010d81620000bb565b809350506020808501516200012281620000bb565b60408601519093506001600160401b03808211156200014057600080fd5b818701915087601f8301126200015557600080fd5b8151818111156200016a576200016a620000d4565b604051601f8201601f19908116603f01168101908382118183101715620001955762000195620000d4565b816040528281528a86848701011115620001ae57600080fd5b600093505b82841015620001d25784840186015181850187015292850192620001b3565b60008684830101528096505050505050509250925092565b600181811c90821680620001ff57607f821691505b6020821081036200022057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200027457600081815260208120601f850160051c810160208610156200024f5750805b601f850160051c820191505b8181101562000270578281556001016200025b565b5050505b505050565b81516001600160401b03811115620002955762000295620000d4565b620002ad81620002a68454620001ea565b8462000226565b602080601f831160018114620002e55760008415620002cc5750858301515b600019600386901b1c1916600185901b17855562000270565b600085815260208120601f198616915b828110156200031657888601518255948401946001909101908401620002f5565b5085821015620003355787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a051611a40620003a3600039600081816101c50152610ec301526000818161034b015281816104e2015281816105ac015281816107b40152818161087b0152818161090b015281816109be0152610c450152611a406000f3fe6080604052600436106101445760003560e01c806394e1fc19116100c0578063c23a5cea11610074578063d0e30db011610059578063d0e30db0146103b7578063f2fde38b146103bf578063f465c77e146103df57600080fd5b8063c23a5cea14610382578063c399ec88146103a257600080fd5b8063a9a23409116100a5578063a9a2340914610319578063b0d691fe14610339578063bb9fe6bf1461036d57600080fd5b806394e1fc19146102be5780639c90b443146102ec57600080fd5b80634a73ccc211610117578063715018a6116100fc578063715018a61461024e5780638da5cb5b1461026357806394d4ad601461028e57600080fd5b80634a73ccc21461020c57806358871c461461022c57600080fd5b806301ffc9a7146101495780630396cb601461017e578063205c28781461019357806323d9ac9b146101b3575b600080fd5b34801561015557600080fd5b50610169610164366004611296565b61040d565b60405190151581526020015b60405180910390f35b61019161018c3660046112df565b6104a6565b005b34801561019f57600080fd5b506101916101ae366004611327565b610558565b3480156101bf57600080fd5b506101e77f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610175565b34801561021857600080fd5b50610191610227366004611395565b6105f0565b34801561023857600080fd5b50610241610643565b604051610175919061143b565b34801561025a57600080fd5b506101916106d5565b34801561026f57600080fd5b5060005473ffffffffffffffffffffffffffffffffffffffff166101e7565b34801561029a57600080fd5b506102ae6102a9366004611395565b6106e9565b6040516101759493929190611497565b3480156102ca57600080fd5b506102de6102d9366004611501565b610726565b604051908152602001610175565b3480156102f857600080fd5b506102de61030736600461155f565b60026020526000908152604090205481565b34801561032557600080fd5b5061019161033436600461157c565b610790565b34801561034557600080fd5b506101e77f000000000000000000000000000000000000000000000000000000000000000081565b34801561037957600080fd5b506101916107aa565b34801561038e57600080fd5b5061019161039d36600461155f565b61082e565b3480156103ae57600080fd5b506102de6108da565b610191610990565b3480156103cb57600080fd5b506101916103da36600461155f565b610a18565b3480156103eb57600080fd5b506103ff6103fa3660046115dc565b610ad4565b60405161017592919061162a565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f58871c460000000000000000000000000000000000000000000000000000000014806104a057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6104ae610af8565b6040517f0396cb6000000000000000000000000000000000000000000000000000000000815263ffffffff821660048201527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690630396cb609034906024016000604051808303818588803b15801561053c57600080fd5b505af1158015610550573d6000803e3d6000fd5b505050505050565b610560610af8565b6040517f205c287800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8381166004830152602482018390527f0000000000000000000000000000000000000000000000000000000000000000169063205c287890604401600060405180830381600087803b15801561053c57600080fd5b6105f8610af8565b7fde8927978d73ffa69bf567d86d93fec194933d529ec4ad35fa867df5fbf1483e828260405161062992919061164c565b60405180910390a1600161063e82848361172a565b505050565b60606001805461065290611697565b80601f016020809104026020016040519081016040528092919081815260200182805461067e90611697565b80156106cb5780601f106106a0576101008083540402835291602001916106cb565b820191906000526020600020905b8154815290600101906020018083116106ae57829003601f168201915b5050505050905090565b6106dd610af8565b6106e76000610b79565b565b60008036816106fc605460148789611844565b810190610709919061186e565b909450925061071b8560548189611844565b949793965094505050565b600061073184610bee565b73ffffffffffffffffffffffffffffffffffffffff85351660009081526002602090815260409182902054915161077193924692309289918991016118a1565b6040516020818303038152906040528051906020012090509392505050565b610798610c2d565b6107a484848484610ccc565b50505050565b6107b2610af8565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663bb9fe6bf6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561081a57600080fd5b505af11580156107a4573d6000803e3d6000fd5b610836610af8565b6040517fc23a5cea00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82811660048301527f0000000000000000000000000000000000000000000000000000000000000000169063c23a5cea90602401600060405180830381600087803b1580156108bf57600080fd5b505af11580156108d3573d6000803e3d6000fd5b5050505050565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015610967573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098b91906118fe565b905090565b6040517fb760faf90000000000000000000000000000000000000000000000000000000081523060048201527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063b760faf99034906024016000604051808303818588803b1580156108bf57600080fd5b610a20610af8565b73ffffffffffffffffffffffffffffffffffffffff8116610ac8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b610ad181610b79565b50565b60606000610ae0610c2d565b610aeb858585610d2e565b915091505b935093915050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146106e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610abf565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6060366000610c01610120850185611917565b915091508360208184030360405194506020810185016040528085528082602087013750505050919050565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146106e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f53656e646572206e6f7420456e747279506f696e7400000000000000000000006044820152606401610abf565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f6d757374206f76657272696465000000000000000000000000000000000000006044820152606401610abf565b6060600080803681610d476102a96101208b018b611917565b929650909450925090506040811480610d605750604181145b610dee57604080517f08c379a00000000000000000000000000000000000000000000000000000000081526020600482015260248101919091527f566572696679696e675061796d61737465723a20696e76616c6964207369676e60448201527f6174757265206c656e67746820696e207061796d6173746572416e64446174616064820152608401610abf565b6000610e31610dfe8b8787610726565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000006000908152601c91909152603c902090565b73ffffffffffffffffffffffffffffffffffffffff8b35166000908152600260205260408120805492935090610e668361197c565b9190505550610eab8184848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f5392505050565b73ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1614610f2857610f0960018686610f77565b6040518060200160405280600081525090965096505050505050610af0565b610f3460008686610f77565b6040805160208101909152600081529b909a5098505050505050505050565b6000806000610f628585610faf565b91509150610f6f81610ff4565b509392505050565b600060d08265ffffffffffff16901b60a08465ffffffffffff16901b85610f9f576000610fa2565b60015b60ff161717949350505050565b6000808251604103610fe55760208301516040840151606085015160001a610fd9878285856111a7565b94509450505050610fed565b506000905060025b9250929050565b6000816004811115611008576110086119db565b036110105750565b6001816004811115611024576110246119db565b0361108b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610abf565b600281600481111561109f5761109f6119db565b03611106576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610abf565b600381600481111561111a5761111a6119db565b03610ad1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610abf565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156111de575060009050600361128d565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611232573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81166112865760006001925092505061128d565b9150600090505b94509492505050565b6000602082840312156112a857600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146112d857600080fd5b9392505050565b6000602082840312156112f157600080fd5b813563ffffffff811681146112d857600080fd5b73ffffffffffffffffffffffffffffffffffffffff81168114610ad157600080fd5b6000806040838503121561133a57600080fd5b823561134581611305565b946020939093013593505050565b60008083601f84011261136557600080fd5b50813567ffffffffffffffff81111561137d57600080fd5b602083019150836020828501011115610fed57600080fd5b600080602083850312156113a857600080fd5b823567ffffffffffffffff8111156113bf57600080fd5b6113cb85828601611353565b90969095509350505050565b6000815180845260005b818110156113fd576020818501810151868301820152016113e1565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b6020815260006112d860208301846113d7565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b600065ffffffffffff8087168352808616602084015250606060408301526114c360608301848661144e565b9695505050505050565b600061016082840312156114e057600080fd5b50919050565b803565ffffffffffff811681146114fc57600080fd5b919050565b60008060006060848603121561151657600080fd5b833567ffffffffffffffff81111561152d57600080fd5b611539868287016114cd565b935050611548602085016114e6565b9150611556604085016114e6565b90509250925092565b60006020828403121561157157600080fd5b81356112d881611305565b6000806000806060858703121561159257600080fd5b8435600381106115a157600080fd5b9350602085013567ffffffffffffffff8111156115bd57600080fd5b6115c987828801611353565b9598909750949560400135949350505050565b6000806000606084860312156115f157600080fd5b833567ffffffffffffffff81111561160857600080fd5b611614868287016114cd565b9660208601359650604090950135949350505050565b60408152600061163d60408301856113d7565b90508260208301529392505050565b60208152600061166060208301848661144e565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600181811c908216806116ab57607f821691505b6020821081036114e0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b601f82111561063e57600081815260208120601f850160051c8101602086101561170b5750805b601f850160051c820191505b8181101561055057828155600101611717565b67ffffffffffffffff83111561174257611742611668565b611756836117508354611697565b836116e4565b6000601f8411600181146117a857600085156117725750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b1783556108d3565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b828110156117f757868501358255602094850194600190920191016117d7565b5086821015611832577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555050505050565b6000808585111561185457600080fd5b8386111561186157600080fd5b5050820193919092039150565b6000806040838503121561188157600080fd5b61188a836114e6565b9150611898602084016114e6565b90509250929050565b60c0815260006118b460c08301896113d7565b60208301979097525073ffffffffffffffffffffffffffffffffffffffff949094166040850152606084019290925265ffffffffffff90811660808401521660a090910152919050565b60006020828403121561191057600080fd5b5051919050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261194c57600080fd5b83018035915067ffffffffffffffff82111561196757600080fd5b602001915036819003821315610fed57600080fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036119d4577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea26469706673582212207d0c13c7ea5f829d261c3117953e6938151e0597bd8358481c6f36e9a3f1138d64736f6c63430008100033";

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
    _paymasterMetadataCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VerifyingPaymaster> {
    return super.deploy(
      _entryPoint,
      _verifyingSigner,
      _paymasterMetadataCID,
      overrides || {}
    ) as Promise<VerifyingPaymaster>;
  }
  override getDeployTransaction(
    _entryPoint: PromiseOrValue<string>,
    _verifyingSigner: PromiseOrValue<string>,
    _paymasterMetadataCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _entryPoint,
      _verifyingSigner,
      _paymasterMetadataCID,
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
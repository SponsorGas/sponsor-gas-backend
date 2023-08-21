"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleAccountFactory__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IEntryPoint",
                name: "_entryPoint",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "accountImplementation",
        outputs: [
            {
                internalType: "contract SimpleAccount",
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
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "salt",
                type: "uint256",
            },
        ],
        name: "createAccount",
        outputs: [
            {
                internalType: "contract SimpleAccount",
                name: "ret",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "salt",
                type: "uint256",
            },
        ],
        name: "getAddress",
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
];
const _bytecode = "0x60a060405234801561001057600080fd5b506040516133ca3803806133ca83398101604081905261002f91610088565b8060405161003c9061007b565b6001600160a01b039091168152602001604051809103906000f080158015610068573d6000803e3d6000fd5b506001600160a01b0316608052506100b8565b61266480610d6683390190565b60006020828403121561009a57600080fd5b81516001600160a01b03811681146100b157600080fd5b9392505050565b608051610c866100e060003960008181604b0152818161011401526102580152610c866000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806311464fbe146100465780635fbfb9cf146100965780638cb84e18146100a9575b600080fd5b61006d7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61006d6100a436600461039d565b6100bc565b61006d6100b736600461039d565b6101ee565b6000806100c984846101ee565b905073ffffffffffffffffffffffffffffffffffffffff81163b80156100f1575090506101e8565b60405173ffffffffffffffffffffffffffffffffffffffff8616602482015284907f000000000000000000000000000000000000000000000000000000000000000090604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc4d66de800000000000000000000000000000000000000000000000000000000179052516101b790610390565b6101c2929190610406565b8190604051809103906000f59050801580156101e2573d6000803e3d6000fd5b50925050505b92915050565b60006103578260001b6040518060200161020790610390565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820381018352601f90910116604081905273ffffffffffffffffffffffffffffffffffffffff871660248201527f000000000000000000000000000000000000000000000000000000000000000090604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152918152602080830180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc4d66de800000000000000000000000000000000000000000000000000000000179052905161030093929101610406565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529082905261033c9291602001610474565b6040516020818303038152906040528051906020012061035e565b9392505050565b60006103578383306000604051836040820152846020820152828152600b8101905060ff815360559020949350505050565b6107ad806104a483390190565b600080604083850312156103b057600080fd5b823573ffffffffffffffffffffffffffffffffffffffff811681146103d457600080fd5b946020939093013593505050565b60005b838110156103fd5781810151838201526020016103e5565b50506000910152565b73ffffffffffffffffffffffffffffffffffffffff8316815260406020820152600082518060408401526104418160608501602087016103e2565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016060019392505050565b600083516104868184602088016103e2565b83519083019061049a8183602088016103e2565b0194935050505056fe60806040526040516107ad3803806107ad83398101604081905261002291610319565b61002e82826000610035565b5050610436565b61003e8361006b565b60008251118061004b5750805b156100665761006483836100ab60201b6100291760201c565b505b505050565b610074816100d7565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d08383604051806060016040528060278152602001610786602791396101a9565b9392505050565b6100ea8161022260201b6100551760201c565b6101515760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101887f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61023160201b6100711760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b6060600080856001600160a01b0316856040516101c691906103e7565b600060405180830381855af49150503d8060008114610201576040519150601f19603f3d011682016040523d82523d6000602084013e610206565b606091505b50909250905061021886838387610234565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102a357825160000361029c576001600160a01b0385163b61029c5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610148565b50816102ad565b6102ad83836102b5565b949350505050565b8151156102c55781518083602001fd5b8060405162461bcd60e51b81526004016101489190610403565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103105781810151838201526020016102f8565b50506000910152565b6000806040838503121561032c57600080fd5b82516001600160a01b038116811461034357600080fd5b60208401519092506001600160401b038082111561036057600080fd5b818501915085601f83011261037457600080fd5b815181811115610386576103866102df565b604051601f8201601f19908116603f011681019083821181831017156103ae576103ae6102df565b816040528281528860208487010111156103c757600080fd5b6103d88360208301602088016102f5565b80955050505050509250929050565b600082516103f98184602087016102f5565b9190910192915050565b60208152600082518060208401526104228160408501602087016102f5565b601f01601f19169190910160400192915050565b610341806104456000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610074565b6100b9565b565b606061004e83836040518060600160405280602781526020016102e5602791396100dd565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff163b151590565b90565b60006100b47f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b3660008037600080366000845af43d6000803e8080156100d8573d6000f35b3d6000fd5b60606000808573ffffffffffffffffffffffffffffffffffffffff16856040516101079190610277565b600060405180830381855af49150503d8060008114610142576040519150601f19603f3d011682016040523d82523d6000602084013e610147565b606091505b509150915061015886838387610162565b9695505050505050565b606083156101fd5782516000036101f65773ffffffffffffffffffffffffffffffffffffffff85163b6101f6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b5081610207565b610207838361020f565b949350505050565b81511561021f5781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ed9190610293565b60005b8381101561026e578181015183820152602001610256565b50506000910152565b60008251610289818460208701610253565b9190910192915050565b60208152600082518060208401526102b2816040850160208701610253565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212204b2eec63d88a652c8e12dcdafa4d504b47e688b7ba8be27afc5198617273497d64736f6c63430008100033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220f408820959f7930bd66958579009259c012a2808c10fe84a38f95c728c26743b64736f6c6343000810003360c0604052306080523480156200001557600080fd5b506040516200266438038062002664833981016040819052620000389162000117565b6001600160a01b03811660a0526200004f62000056565b5062000149565b600054610100900460ff1615620000c35760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161462000115576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6000602082840312156200012a57600080fd5b81516001600160a01b03811681146200014257600080fd5b9392505050565b60805160a0516124a8620001bc6000396000818161032f01528181610918015281816109c601528181610de201528181611033015281816112860152818161144b015261165e015260008181610547015281816105fc01528181610a8201528181610b320152610c7b01526124a86000f3fe60806040526004361061012c5760003560e01c806352d1902d116100a5578063bc197c8111610074578063c4d66de811610059578063c4d66de8146103d0578063d087d288146103f0578063f23a6e611461040557600080fd5b8063bc197c8114610373578063c399ec88146103bb57600080fd5b806352d1902d146102b35780638da5cb5b146102c8578063b0d691fe14610320578063b61d27f61461035357600080fd5b80633a871cdd116100fc5780634a58db19116100e15780634a58db19146102785780634d44560d146102805780634f1ef286146102a057600080fd5b80633a871cdd1461022a57806347e1da2a1461025857600080fd5b806223de291461013857806301ffc9a71461015f578063150b7a02146101945780633659cfe61461020a57600080fd5b3661013357005b600080fd5b34801561014457600080fd5b5061015d610153366004611d28565b5050505050505050565b005b34801561016b57600080fd5b5061017f61017a366004611dd9565b61044b565b60405190151581526020015b60405180910390f35b3480156101a057600080fd5b506101d96101af366004611e1b565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff00000000000000000000000000000000000000000000000000000000909116815260200161018b565b34801561021657600080fd5b5061015d610225366004611e8e565b610530565b34801561023657600080fd5b5061024a610245366004611eab565b61073a565b60405190815260200161018b565b34801561026457600080fd5b5061015d610273366004611f44565b610760565b61015d610916565b34801561028c57600080fd5b5061015d61029b366004611fde565b6109bc565b61015d6102ae366004612039565b610a6b565b3480156102bf57600080fd5b5061024a610c61565b3480156102d457600080fd5b506000546102fb9062010000900473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161018b565b34801561032c57600080fd5b507f00000000000000000000000000000000000000000000000000000000000000006102fb565b34801561035f57600080fd5b5061015d61036e36600461211b565b610d4d565b34801561037f57600080fd5b506101d961038e366004612177565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b3480156103c757600080fd5b5061024a610d9c565b3480156103dc57600080fd5b5061015d6103eb366004611e8e565b610e53565b3480156103fc57600080fd5b5061024a610fe6565b34801561041157600080fd5b506101d9610420366004612215565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a020000000000000000000000000000000000000000000000000000000014806104de57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b8061052a57507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001630036105fa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c000000000000000000000000000000000000000060648201526084015b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661066f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610712576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f7879000000000000000000000000000000000000000060648201526084016105f1565b61071b81611062565b604080516000808252602082019092526107379183919061106a565b50565b600061074461126e565b61074e848461130f565b9050610759826113c8565b9392505050565b610768611433565b848114801561077e575082158061077e57508281145b6107e4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f77726f6e67206172726179206c656e677468730000000000000000000000000060448201526064016105f1565b600083900361089a5760005b858110156108945761088287878381811061080d5761080d61227f565b90506020020160208101906108229190611e8e565b60008585858181106108365761083661227f565b905060200281019061084891906122ae565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506114fa92505050565b8061088c81612313565b9150506107f0565b5061090e565b60005b8581101561090c576108fa8787838181106108ba576108ba61227f565b90506020020160208101906108cf9190611e8e565b8686848181106108e1576108e161227f565b905060200201358585858181106108365761083661227f565b8061090481612313565b91505061089d565b505b505050505050565b7f00000000000000000000000000000000000000000000000000000000000000006040517fb760faf900000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff919091169063b760faf99034906024016000604051808303818588803b1580156109a157600080fd5b505af11580156109b5573d6000803e3d6000fd5b5050505050565b6109c4611577565b7f00000000000000000000000000000000000000000000000000000000000000006040517f205c287800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260248201849052919091169063205c287890604401600060405180830381600087803b158015610a5757600080fd5b505af115801561090e573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610b30576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c000000000000000000000000000000000000000060648201526084016105f1565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610ba57f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610c48576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f7879000000000000000000000000000000000000000060648201526084016105f1565b610c5182611062565b610c5d8282600161106a565b5050565b60003073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610d28576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016105f1565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b610d55611433565b610d96848484848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506114fa92505050565b50505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906370a08231906024015b602060405180830381865afa158015610e2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e4e9190612372565b905090565b600054610100900460ff1615808015610e735750600054600160ff909116105b80610e8d5750303b158015610e8d575060005460ff166001145b610f19576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016105f1565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790558015610f7757600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b610f8082611608565b8015610c5d57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6040517f35567e1a0000000000000000000000000000000000000000000000000000000081523060048201526000602482018190529073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906335567e1a90604401610e0d565b610737611577565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156110a25761109d836116a7565b505050565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611127575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261112491810190612372565b60015b6111b3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f74205555505300000000000000000000000000000000000060648201526084016105f1565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8114611262576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c6555554944000000000000000000000000000000000000000000000060648201526084016105f1565b5061109d8383836117b1565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461130d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f6163636f756e743a206e6f742066726f6d20456e747279506f696e740000000060448201526064016105f1565b565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000006000908152601c829052603c812061138c61134f6101408601866122ae565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525085939250506117d69050565b60005462010000900473ffffffffffffffffffffffffffffffffffffffff9081169116146113be57600191505061052a565b5060009392505050565b80156107375760405160009033907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90849084818181858888f193505050503d80600081146109b5576040519150601f19603f3d011682016040523d82523d6000602084013e6109b5565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161480611494575060005462010000900473ffffffffffffffffffffffffffffffffffffffff1633145b61130d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f6163636f756e743a206e6f74204f776e6572206f7220456e747279506f696e7460448201526064016105f1565b6000808473ffffffffffffffffffffffffffffffffffffffff16848460405161152391906123af565b60006040518083038185875af1925050503d8060008114611560576040519150601f19603f3d011682016040523d82523d6000602084013e611565565b606091505b5091509150816109b557805160208201fd5b60005462010000900473ffffffffffffffffffffffffffffffffffffffff163314806115a257503330145b61130d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f6f6e6c79206f776e65720000000000000000000000000000000000000000000060448201526064016105f1565b600080547fffffffffffffffffffff0000000000000000000000000000000000000000ffff166201000073ffffffffffffffffffffffffffffffffffffffff8481168202929092178084556040519190048216927f0000000000000000000000000000000000000000000000000000000000000000909216917f47e55c76e7a6f1fd8996a1da8008c1ea29699cca35e7bcd057f2dec313b6e5de91a350565b73ffffffffffffffffffffffffffffffffffffffff81163b61174b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e74726163740000000000000000000000000000000000000060648201526084016105f1565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6117ba836117fa565b6000825111806117c75750805b1561109d57610d968383611847565b60008060006117e5858561186c565b915091506117f2816118b1565b509392505050565b611803816116a7565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060610759838360405180606001604052806027815260200161244c60279139611a64565b60008082516041036118a25760208301516040840151606085015160001a61189687828585611ae9565b945094505050506118aa565b506000905060025b9250929050565b60008160048111156118c5576118c56123cb565b036118cd5750565b60018160048111156118e1576118e16123cb565b03611948576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016105f1565b600281600481111561195c5761195c6123cb565b036119c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016105f1565b60038160048111156119d7576119d76123cb565b03610737576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f756500000000000000000000000000000000000000000000000000000000000060648201526084016105f1565b60606000808573ffffffffffffffffffffffffffffffffffffffff1685604051611a8e91906123af565b600060405180830381855af49150503d8060008114611ac9576040519150601f19603f3d011682016040523d82523d6000602084013e611ace565b606091505b5091509150611adf86838387611bd8565b9695505050505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115611b205750600090506003611bcf565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611b74573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116611bc857600060019250925050611bcf565b9150600090505b94509492505050565b60608315611c6e578251600003611c675773ffffffffffffffffffffffffffffffffffffffff85163b611c67576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016105f1565b5081611c78565b611c788383611c80565b949350505050565b815115611c905781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f191906123fa565b73ffffffffffffffffffffffffffffffffffffffff8116811461073757600080fd5b60008083601f840112611cf857600080fd5b50813567ffffffffffffffff811115611d1057600080fd5b6020830191508360208285010111156118aa57600080fd5b60008060008060008060008060c0898b031215611d4457600080fd5b8835611d4f81611cc4565b97506020890135611d5f81611cc4565b96506040890135611d6f81611cc4565b955060608901359450608089013567ffffffffffffffff80821115611d9357600080fd5b611d9f8c838d01611ce6565b909650945060a08b0135915080821115611db857600080fd5b50611dc58b828c01611ce6565b999c989b5096995094979396929594505050565b600060208284031215611deb57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461075957600080fd5b600080600080600060808688031215611e3357600080fd5b8535611e3e81611cc4565b94506020860135611e4e81611cc4565b935060408601359250606086013567ffffffffffffffff811115611e7157600080fd5b611e7d88828901611ce6565b969995985093965092949392505050565b600060208284031215611ea057600080fd5b813561075981611cc4565b600080600060608486031215611ec057600080fd5b833567ffffffffffffffff811115611ed757600080fd5b84016101608187031215611eea57600080fd5b95602085013595506040909401359392505050565b60008083601f840112611f1157600080fd5b50813567ffffffffffffffff811115611f2957600080fd5b6020830191508360208260051b85010111156118aa57600080fd5b60008060008060008060608789031215611f5d57600080fd5b863567ffffffffffffffff80821115611f7557600080fd5b611f818a838b01611eff565b90985096506020890135915080821115611f9a57600080fd5b611fa68a838b01611eff565b90965094506040890135915080821115611fbf57600080fd5b50611fcc89828a01611eff565b979a9699509497509295939492505050565b60008060408385031215611ff157600080fd5b8235611ffc81611cc4565b946020939093013593505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806040838503121561204c57600080fd5b823561205781611cc4565b9150602083013567ffffffffffffffff8082111561207457600080fd5b818501915085601f83011261208857600080fd5b81358181111561209a5761209a61200a565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156120e0576120e061200a565b816040528281528860208487010111156120f957600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000806000806060858703121561213157600080fd5b843561213c81611cc4565b935060208501359250604085013567ffffffffffffffff81111561215f57600080fd5b61216b87828801611ce6565b95989497509550505050565b60008060008060008060008060a0898b03121561219357600080fd5b883561219e81611cc4565b975060208901356121ae81611cc4565b9650604089013567ffffffffffffffff808211156121cb57600080fd5b6121d78c838d01611eff565b909850965060608b01359150808211156121f057600080fd5b6121fc8c838d01611eff565b909650945060808b0135915080821115611db857600080fd5b60008060008060008060a0878903121561222e57600080fd5b863561223981611cc4565b9550602087013561224981611cc4565b94506040870135935060608701359250608087013567ffffffffffffffff81111561227357600080fd5b611fcc89828a01611ce6565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126122e357600080fd5b83018035915067ffffffffffffffff8211156122fe57600080fd5b6020019150368190038213156118aa57600080fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361236b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b60006020828403121561238457600080fd5b5051919050565b60005b838110156123a657818101518382015260200161238e565b50506000910152565b600082516123c181846020870161238b565b9190910192915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b602081526000825180602084015261241981604085016020870161238b565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220081d8966f661fa35ab036a02aafc8acb2a9e956bb8e569e61f192eeae2b92c4764736f6c63430008100033";
const isSuperArgs = (xs) => xs.length > 1;
class SimpleAccountFactory__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_entryPoint, overrides) {
        return super.deploy(_entryPoint, overrides || {});
    }
    getDeployTransaction(_entryPoint, overrides) {
        return super.getDeployTransaction(_entryPoint, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static bytecode = _bytecode;
    static abi = _abi;
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.SimpleAccountFactory__factory = SimpleAccountFactory__factory;
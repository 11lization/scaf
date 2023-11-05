const Web3 = require("web3");

const besuRpcUrl = "http://127.0.0.1:8545";
const contractAddress = "0x3484B20600854091C166C062FacAd700123f5f71";
const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "commitmentMap",
    outputs: [
      {
        internalType: "bytes32",
        name: "x",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "y",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "_commitment",
        type: "tuple",
      },
    ],
    name: "setCommitment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "getCommitment",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "p1",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "p2",
        type: "tuple",
      },
    ],
    name: "addPoints",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "point",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "scalar",
        type: "uint256",
      },
    ],
    name: "multiplyPoint",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point[]",
        name: "leafNodes",
        type: "tuple[]",
      },
    ],
    name: "constructTree",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point[]",
        name: "leafNodes",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "r",
        type: "uint256",
      },
    ],
    name: "layerWiseMultiplication",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "x",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "y",
            type: "bytes32",
          },
        ],
        internalType: "struct Storage.Point",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
const fromAddress = "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";
const privateKey =
  "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

async function main() {
  const web3 = new Web3(besuRpcUrl);

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const p1 = {
    x: web3.utils.padLeft(
      web3.utils.toHex(
        "8090798039399453617883249929225093513033456773580886109778985735787988485181"
      ),
      64
    ), // 32 바이트 (64 자리)로 패딩합니다.
    y: web3.utils.padLeft(
      web3.utils.toHex(
        "21240594951649199182292027341669565866117744461549300456713667321771367703474"
      ),
      64
    ),
  };
  const p2 = {
    x: web3.utils.padLeft(
      web3.utils.toHex(
        "20840613437039789275373177678523929601271346838764054246845731122944259753626"
      ),
      64
    ), // 32 바이트 (64 자리)로 패딩합니다.
    y: web3.utils.padLeft(
      web3.utils.toHex(
        "9099123481492253225009987306435833127964476960200856098068614174828815749046"
      ),
      64
    ),
  };
  const p3 = {
    x: web3.utils.padLeft(
      web3.utils.toHex(
        "16666955761996083370284749174687320069502968618604461871517146392945796299386"
      ),
      64
    ), // 32 바이트 (64 자리)로 패딩합니다.
    y: web3.utils.padLeft(
      web3.utils.toHex(
        "3192576691035387354108841984590118147850624168341649095453167183475965635483"
      ),
      64
    ),
  };
  const p4 = {
    x: web3.utils.padLeft(
      web3.utils.toHex(
        "6263739935173959322757304642048703420331119994629115940651740308713387825385"
      ),
      64
    ), // 32 바이트 (64 자리)로 패딩합니다.
    y: web3.utils.padLeft(
      web3.utils.toHex(
        "13598181623557199153035146622150268529176637337078733026884359464894311264626"
      ),
      64
    ),
  };
  const r = BigInt("1234567890123456789012345678901234567890");
  const r_hex = web3.utils.toHex(r.toString());

  // const data = contract.methods.addPoints(p1, p2).encodeABI();

  // const transaction = {
  //   to: contractAddress,
  //   data: data,
  //   gas: 2000000000000000,
  //   from: fromAddress,
  // };

  // const signedTx = await web3.eth.accounts.signTransaction(
  //   transaction,
  //   privateKey
  // );

  // await web3.eth
  //   .sendSignedTransaction(signedTx.rawTransaction)
  //   .on("receipt", (receipt) => {
  //     console.log("트랜잭션 성공", receipt);
  //   })
  //   .on("error", (error) => {
  //     console.log("트랜잭션 실패", error);
  //   });

  const result = await contract.methods
    .layerWiseMultiplication([p1, p2, p3, p4], r_hex)
    .call({ from: fromAddress });

  console.log("곱셈 결과:", result);
}

main();

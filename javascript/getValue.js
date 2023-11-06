const Web3 = require("web3");
const con = require("../build/contracts/Storage.json");

const besuRpcUrl = "http://127.0.0.1:8545";
const contractAddress = con.networks[2018].address;
const contractABI = con.abi;
const fromAddress = "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";
const privateKey =
  "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

async function main() {
  const web3 = new Web3(besuRpcUrl);

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const createPoint = (x, y) => ({
    x: web3.utils.padLeft(web3.utils.toHex(x.toString()), 64),
    y: web3.utils.padLeft(web3.utils.toHex(y.toString()), 64),
  });

  const points = [];
  for (let i = 0; i < 1024; i++) {
    const x =
      "8090798039399453617883249929225093513033456773580886109778985735787988485181";
    const y =
      "21240594951649199182292027341669565866117744461549300456713667321771367703474";
    points.push(createPoint(x, y));
  }

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
  // const p3 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "16666955761996083370284749174687320069502968618604461871517146392945796299386"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "3192576691035387354108841984590118147850624168341649095453167183475965635483"
  //     ),
  //     64
  //   ),
  // };
  // const p4 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "6263739935173959322757304642048703420331119994629115940651740308713387825385"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "13598181623557199153035146622150268529176637337078733026884359464894311264626"
  //     ),
  //     64
  //   ),
  // };
  // const p5 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "11960583679663384366480174444786576796647662727306252418698415822917902887957"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "1593966172791376403029241248399967522928053988295567913586599498591215462419"
  //     ),
  //     64
  //   ),
  // };
  // const p6 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "7031959683282870454445370092176192631598316284287623002054656345261072872727"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "18423985884519550055697364840216683506349686267643106190879448227028663401432"
  //     ),
  //     64
  //   ),
  // };
  // const p7 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "17674185364569177181375940725669906313009758579974743260674333421480005882241"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "4923760616500646932038002714506217333997708620124856180221247995027548756469"
  //     ),
  //     64
  //   ),
  // };
  // const p8 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "8471613928896151609652432363624550995386439049968070023269517492214345041611"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "1848985045720736528399882104942898037371206761071446572926676238293944645370"
  //     ),
  //     64
  //   ),
  // };
  // const p9 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "8090798039399453617883249929225093513033456773580886109778985735787988485181"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "21240594951649199182292027341669565866117744461549300456713667321771367703474"
  //     ),
  //     64
  //   ),
  // };
  // const p10 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "20840613437039789275373177678523929601271346838764054246845731122944259753626"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "9099123481492253225009987306435833127964476960200856098068614174828815749046"
  //     ),
  //     64
  //   ),
  // };
  // const p11 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "16666955761996083370284749174687320069502968618604461871517146392945796299386"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "3192576691035387354108841984590118147850624168341649095453167183475965635483"
  //     ),
  //     64
  //   ),
  // };
  // const p12 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "6263739935173959322757304642048703420331119994629115940651740308713387825385"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "13598181623557199153035146622150268529176637337078733026884359464894311264626"
  //     ),
  //     64
  //   ),
  // };
  // const p13 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "11960583679663384366480174444786576796647662727306252418698415822917902887957"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "1593966172791376403029241248399967522928053988295567913586599498591215462419"
  //     ),
  //     64
  //   ),
  // };
  // const p14 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "7031959683282870454445370092176192631598316284287623002054656345261072872727"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "18423985884519550055697364840216683506349686267643106190879448227028663401432"
  //     ),
  //     64
  //   ),
  // };
  // const p15 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "17674185364569177181375940725669906313009758579974743260674333421480005882241"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "4923760616500646932038002714506217333997708620124856180221247995027548756469"
  //     ),
  //     64
  //   ),
  // };
  // const p16 = {
  //   x: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "8471613928896151609652432363624550995386439049968070023269517492214345041611"
  //     ),
  //     64
  //   ), // 32 바이트 (64 자리)로 패딩합니다.
  //   y: web3.utils.padLeft(
  //     web3.utils.toHex(
  //       "1848985045720736528399882104942898037371206761071446572926676238293944645370"
  //     ),
  //     64
  //   ),
  // };
  const r = BigInt("1234567890123456789012345678901234567890");

  const data = contract.methods.layerWiseMultiplication(points, r).encodeABI();

  // const data = contract.methods
  //   .layerWiseMultiplication(points, r_hex)
  //   .encodeABI();

  const transaction = {
    to: contractAddress,
    data: data,
    gas: 2000000000000000,
    from: fromAddress,
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    privateKey
  );

  await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .on("receipt", (receipt) => {
      console.log("트랜잭션 성공", receipt);
    })
    .catch((error) => {
      console.log("트랜잭션 실패", error);
    });

  // const result = await contract.methods
  //   .layerWiseMultiplication([p1, p2, p3, p4, p5, p6, p7, p8], r_hex)
  //   .call({ from: fromAddress });

  // console.log("곱셈 결과:", result);
}

main();

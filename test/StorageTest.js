// test/StorageTest.js
const Storage = artifacts.require("Storage");

contract("Storage", (accounts) => {
  it("should correctly perform layer wise multiplication", async () => {
    const storageInstance = await Storage.new();

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

    const r = BigInt("1234567890123456789012345678901234567890");

    await storageInstance.calculateEvenIndexedNodesSum(points, r, {
      from: accounts[0],
    });
  });
});

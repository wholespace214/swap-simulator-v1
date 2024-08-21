const { ethers } = require("ethers");

require("dotenv").config();

const SimulatorV1ABI = require("./out/SimulatorV1.sol/SimulatorV1.json").abi;

// DO NOT USE REAL PRIVATE KEY
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const signer = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, provider);

const SimulatorV1Address = "0x37384C5D679aeCa03D211833711C277Da470C670";

const contract = new ethers.Contract(
  SimulatorV1Address,
  SimulatorV1ABI,
  signer
);

(async () => {
  const swapParam1 = {
    protocol: 0,
    pool: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // random address
    tokenIn: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    tokenOut: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    fee: 0,
    amount: ethers.utils.parseUnits("1", 6),
  };

  const swapParam2 = {
    protocol: 1,
    pool: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // random address
    tokenIn: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    tokenOut: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    fee: 500,
    amount: 0, // no need
  };

  const swapParam3 = {
    protocol: 2,
    pool: "0x445FE580eF8d70FF569aB36e80c647af338db351", // real Curve.fi pool address
    tokenIn: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    tokenOut: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    fee: 0,
    amount: 0, // no need
  };

  const swapParams = [swapParam1, swapParam2, swapParam3];

  const amountOut = await contract.callStatic.simulateSwapIn(swapParams);
  console.log(amountOut.toString());
})();
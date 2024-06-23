// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const SimpleContract = await hre.ethers.getContractFactory("Function Frontend");
  const simpleContract = await SimpleContract.deploy("Hello, metacrafters!");
  await simpleContract.deployed();

  console.log(`Contract deployed to: ${simpleContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Get the ContractFactory for the Voting contract
  const Voting = await hre.ethers.getContractFactory("Voting");

  // Set the voting start and end times (in Unix timestamp)
  const votingStartTime = Math.floor(Date.now() / 1000); // Current time
  const votingEndTime = votingStartTime + (24 * 60 * 60); // 24 hours from now

  // Deploy the contract with the start and end times
  const votingContract = await Voting.deploy(votingStartTime, votingEndTime);

  // Wait for the contract to be deployed
  await votingContract.deployed();

  console.log(`Contract deployed to: ${votingContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


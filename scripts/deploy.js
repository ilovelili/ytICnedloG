const { ethers } = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  const address = await voting.getAddress();
  console.log("Voting deployed to:", address);

  await saveDeployment(address, deployer.address);
}

async function saveDeployment(contractAddress, deployerAddress) {
  const deploymentsDir = path.resolve(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const filePath = path.join(deploymentsDir, "deployment.json");
  const data = {
    contractAddress,
    deployerAddress,
    network: process.env.HARDHAT_NETWORK || "localhost",
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Deployment info saved to", filePath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

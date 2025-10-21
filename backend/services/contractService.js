const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const ARTIFACT_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "artifacts",
  "contracts",
  "Voting.sol",
  "Voting.json"
);

const DEPLOYMENT_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "deployments",
  "deployment.json"
);

function loadArtifact() {
  if (!fs.existsSync(ARTIFACT_PATH)) {
    throw new Error(
      "Voting artifact not found. Compile contracts with `npm run build:contracts`."
    );
  }
  return JSON.parse(fs.readFileSync(ARTIFACT_PATH, "utf8"));
}

function loadDeployment() {
  if (!fs.existsSync(DEPLOYMENT_PATH)) {
    throw new Error(
      "Deployment info missing. Deploy the contract with `npm run deploy:local`."
    );
  }
  return JSON.parse(fs.readFileSync(DEPLOYMENT_PATH, "utf8"));
}

function getProvider() {
  const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8545";
  return new ethers.JsonRpcProvider(rpcUrl);
}

function getOwnerWallet(provider = getProvider()) {
  const privateKey = process.env.OWNER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("OWNER_PRIVATE_KEY is not set in environment variables");
  }
  return new ethers.Wallet(privateKey, provider);
}

function getContract(signerOrProvider = getProvider()) {
  const { abi } = loadArtifact();
  const { contractAddress } = loadDeployment();
  if (!contractAddress) {
    throw new Error("Contract address missing in deployment file");
  }
  return new ethers.Contract(contractAddress, abi, signerOrProvider);
}

async function addCandidate(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Candidate name must be provided");
  }

  const wallet = getOwnerWallet();
  const contract = getContract(wallet);
  const tx = await contract.addCandidate(name);
  const receipt = await tx.wait();
  const index = (await contract.candidateCount()) - 1n;

  return {
    name,
    index: Number(index),
    transactionHash: receipt.hash,
  };
}

async function listCandidates() {
  const contract = getContract();
  const candidates = await contract.getCandidates();

  return candidates.map((candidate, index) => ({
    index,
    name: candidate.name,
    voteCount: Number(candidate.voteCount),
  }));
}

async function castVote(candidateIndex, voterPrivateKey) {
  if (candidateIndex === undefined) {
    throw new Error("candidateIndex is required");
  }

  if (typeof candidateIndex !== "number" && typeof candidateIndex !== "bigint") {
    throw new Error("candidateIndex must be a number");
  }

  if (!voterPrivateKey) {
    throw new Error("voterPrivateKey is required to sign the vote transaction");
  }

  const provider = getProvider();
  const wallet = new ethers.Wallet(voterPrivateKey, provider);
  const contract = getContract(wallet);

  const tx = await contract.vote(candidateIndex);
  const receipt = await tx.wait();

  return {
    voter: wallet.address,
    candidateIndex,
    transactionHash: receipt.hash,
  };
}

async function getWinner() {
  const contract = getContract();
  const winnerName = await contract.getWinner();
  return { winner: winnerName };
}

module.exports = {
  addCandidate,
  listCandidates,
  castVote,
  getWinner,
};

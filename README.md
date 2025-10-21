# GoldenCity Voting – Blockchain Developer Test

This repository contains a focused implementation of the blockchain developer exercise: an owner-managed voting smart contract written in Solidity, paired with a Node.js backend that exposes REST endpoints through Ethers.js.

---

## Features at a Glance

- **Smart Contract** – `contracts/Voting.sol`
  - Owner-only candidate registration via `addCandidate(string name)`
  - One-vote-per-address enforcement in `vote(uint candidateIndex)`
  - Candidate enumeration with vote totals using `getCandidates()`
  - Winner lookup via `getWinner()`
- **REST Backend** – Express server under `backend/`
  - `POST /candidates` – Add a candidate (protected with the `x-owner-secret` header)
  - `GET /candidates` – List candidates and vote totals
  - `POST /vote` – Cast a vote using the caller’s private key
  - `GET /winner` – Retrieve the current leading candidate
- **Tooling Pipeline** – Hardhat + Ethers.js with a deployment script that stores contract metadata for the backend.

---

## Prerequisites

- Node.js v18 LTS or later
---

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in `.env` with:
   - `RPC_URL` – JSON-RPC endpoint (defaults to `http://127.0.0.1:8545` for Hardhat).
   - `OWNER_PRIVATE_KEY` – Private key of the contract owner (use one of the Hardhat node accounts locally).
   - `OWNER_SECRET` – Shared secret required in the `x-owner-secret` header when adding candidates.

---

## Hardhat Workflows

Compile contracts:
```bash
npm run build:contracts
```

Execute unit tests:
```bash
npm test
```

### Local Development Loop

1. **Start a Hardhat node** (terminal 1)
   ```bash
   npm run start:node
   ```

2. **Deploy the Voting contract** (terminal 2)
   ```bash
   npm run deploy:local
   ```
   Deployment metadata is written to `deployments/deployment.json`.

3. **Run the REST backend** (terminal 3)
   ```bash
   npm run start:backend
   ```
   The API listens on `http://localhost:4000` by default.

---

## REST API Endpoints

All responses follow `{ success: boolean, data?: any, message?: string }`.

### `POST /candidates` — add candidate (owner only)
```bash
curl -X POST http://localhost:4000/candidates \
  -H "Content-Type: application/json" \
  -H "x-owner-secret: <OWNER_SECRET>" \
  -d '{"name":"Alice"}'
```

### `GET /candidates` — list candidates
```bash
curl http://localhost:4000/candidates
```
_Response_
```json
{
  "success": true,
  "data": [
    { "index": 0, "name": "Alice", "voteCount": 1 },
    { "index": 1, "name": "Bob", "voteCount": 0 }
  ]
}
```

### `POST /vote` — cast a vote
Use a private key from the Hardhat node output. Each address may vote once.
```bash
curl -X POST http://localhost:4000/vote \
  -H "Content-Type: application/json" \
  -d '{
    "candidateIndex": 0,
    "voterPrivateKey": "<HARDHAT_ACCOUNT_PRIVATE_KEY>"
  }'
```

### `GET /winner` — fetch winner
```bash
curl http://localhost:4000/winner
```
_Response_
```json
{
  "success": true,
  "data": {
    "winner": "Alice"
  }
}
```

---

## Project Structure

```
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── contracts/
│   └── Voting.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── Voting.js
├── hardhat.config.js
├── package.json
└── .env.example
```

---

## Tips & Next Steps

- `npm run clean` removes Hardhat caches (`cache/`, `artifacts/`, `deployments/`). Clean up if builds feel stale.
- The backend signs transactions using provided private keys—great for local evaluation, but swap in wallet-based signing for production.
- Add additional networks to `hardhat.config.js` when you’re ready for testnets; redeploy with `--network <name>`.

Happy building! ✨

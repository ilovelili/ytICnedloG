const express = require("express");
const {
  createCandidate,
  getCandidates,
  vote,
  getWinner,
} = require("../controllers/voteController");
const ownerOnly = require("../middleware/ownerOnly");

const router = express.Router();

router.post("/candidates", ownerOnly, createCandidate);
router.get("/candidates", getCandidates);
router.post("/vote", vote);
router.get("/winner", getWinner);

module.exports = router;

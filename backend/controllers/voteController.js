const {
  addCandidate,
  listCandidates,
  castVote,
  getWinner,
} = require("../services/contractService");

exports.createCandidate = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await addCandidate(name);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCandidates = async (_req, res) => {
  try {
    const candidates = await listCandidates();
    res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.vote = async (req, res) => {
  try {
    const { candidateIndex, voterPrivateKey } = req.body;
    const result = await castVote(candidateIndex, voterPrivateKey);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getWinner = async (_req, res) => {
  try {
    const winner = await getWinner();
    res.status(200).json({ success: true, data: winner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

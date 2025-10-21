// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public owner;
    Candidate[] private candidates;
    mapping(address => bool) private hasVoted;

    event CandidateAdded(uint256 indexed index, string name);
    event Voted(address indexed voter, uint256 indexed candidateIndex);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string calldata name) external onlyOwner {
        require(bytes(name).length > 0, "Name required");
        candidates.push(Candidate({name: name, voteCount: 0}));
        emit CandidateAdded(candidates.length - 1, name);
    }

    function vote(uint256 candidateIndex) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateIndex < candidates.length, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;

        emit Voted(msg.sender, candidateIndex);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() external view returns (string memory winnerName) {
        require(candidates.length > 0, "No candidates");

        uint256 winningVoteCount = 0;
        uint256 winningIndex = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningIndex = i;
            }
        }

        winnerName = candidates[winningIndex].name;
    }

    function candidateCount() external view returns (uint256) {
        return candidates.length;
    }

    function hasAddressVoted(address voter) external view returns (bool) {
        return hasVoted[voter];
    }
}

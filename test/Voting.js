const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  async function deployFixture() {
    const [owner, voter1, voter2] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    return { voting, owner, voter1, voter2 };
  }

  it("allows owner to add candidates", async function () {
    const { voting, owner } = await deployFixture();

    await voting.connect(owner).addCandidate("Alice");
    await voting.connect(owner).addCandidate("Bob");

    const candidates = await voting.getCandidates();
    expect(candidates.length).to.equal(2);
    expect(candidates[0].name).to.equal("Alice");
  });

  it("prevents non-owner from adding candidates", async function () {
    const { voting, voter1 } = await deployFixture();

    await expect(
      voting.connect(voter1).addCandidate("Eve")
    ).to.be.revertedWith("Caller is not the owner");
  });

  it("prevents double voting", async function () {
    const { voting, owner, voter1 } = await deployFixture();

    await voting.connect(owner).addCandidate("Alice");
    await voting.connect(owner).addCandidate("Bob");

    await voting.connect(voter1).vote(0);
    await expect(voting.connect(voter1).vote(1)).to.be.revertedWith(
      "Already voted"
    );
  });

  it("rejects invalid candidate indexes", async function () {
    const { voting, voter1 } = await deployFixture();
    await expect(voting.connect(voter1).vote(0)).to.be.revertedWith(
      "Invalid candidate"
    );
  });

  it("returns the winner", async function () {
    const { voting, owner, voter1, voter2 } = await deployFixture();

    await voting.connect(owner).addCandidate("Alice");
    await voting.connect(owner).addCandidate("Bob");

    await voting.connect(voter1).vote(0);
    await voting.connect(voter2).vote(0);

    const winner = await voting.getWinner();
    expect(winner).to.equal("Alice");
  });
});

import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Token 1 Should Deploy", async function () {
      const Token1 = await ethers.deployContract("Token1");
      await Token1.waitForDeployment();


      expect(Token1.target).to.not.equal(0);
    });

    it("Token 2 Should Deploy", async function () {
      const Token2 = await ethers.deployContract("Token2");
      await Token2.waitForDeployment();


      expect(Token2.target).to.not.equal(0);
    });

    it("Token 1 Should Deploy", async function () {
      const Token1 = await ethers.deployContract("Token1");
      await Token1.waitForDeployment();

      const Token2 = await ethers.deployContract("Token2");
      await Token2.waitForDeployment();

      const swap = await ethers.deployContract("SimpleSwap", [Token1.target, Token2.target]);
      await swap.waitForDeployment();


      expect(swap.target).to.not.equal(0);
    });

  });

});

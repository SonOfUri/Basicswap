// import {
//   loadFixture,
// } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Swap", function () {

  describe("Deployment Tests", function () {
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

    it("Swap Should Deploy", async function () {
      const Token1 = await ethers.deployContract("Token1");
      await Token1.waitForDeployment();

      const Token2 = await ethers.deployContract("Token2");
      await Token2.waitForDeployment();

      const swap = await ethers.deployContract("SimpleSwap",[Token1.target, Token2.target]);
      await swap.waitForDeployment();

      expect(swap.target).to.be.properAddress;

    });

  });

describe("Functionality Tests", function() {

  it("should revert if amount is 0", async function() {
    const Token1 = await ethers.getContractFactory("Token1");
    const token1 = await Token1.deploy();

    const Token2 = await ethers.getContractFactory("Token2");
    const token2 = await Token2.deploy();

    const TokenSwapContract = await ethers.getContractFactory("SimpleSwap");
    const tokenSwapContract = await TokenSwapContract.deploy(token1.target, token2.target);

    const [owner, recipient] = await ethers.getSigners();

    const amount = 0;

    await expect(tokenSwapContract.connect(owner).swapToken1ToToken2(amount, recipient.address)).to.be.revertedWith("Amount must be greater than 0");
});


it("should revert if recipient address is invalid", async function() {
  const Token1 = await ethers.getContractFactory("Token1");
  const token1 = await Token1.deploy();

  const Token2 = await ethers.getContractFactory("Token2");
  const token2 = await Token2.deploy();

  const TokenSwapContract = await ethers.getContractFactory("SimpleSwap");
  const tokenSwapContract = await TokenSwapContract.deploy(token1.target, token2.target);

  const [owner, recipient] = await ethers.getSigners();

  const amount = 100;
  const invalidRecipient = "0x0000000000000000000000000000000000000000";

  await expect(tokenSwapContract.connect(owner).swapToken1ToToken2(amount, invalidRecipient)).to.be.revertedWith("Invalid recipient address");
});

    it("should swap tokens from token1 to token2", async function() {
      const Token1 = await ethers.deployContract("Token1");
      await Token1.waitForDeployment();

      const Token2 = await ethers.deployContract("Token2");
      await Token2.waitForDeployment();

        const TokenSwapContract = await ethers.deployContract("SimpleSwap", [Token1.target, Token2.target]);
        await TokenSwapContract.waitForDeployment();


        const [owner, recipient] = await ethers.getSigners();

        // Mint some tokens for testing
        await Token1.transfer(owner.address, 1000);
        await Token2.transfer(TokenSwapContract.target, 1000);

        const amount = 100;

        await Token1.connect(owner).approve(TokenSwapContract.target, amount);
        await TokenSwapContract.connect(owner).swapToken1ToToken2(amount, recipient.address);

        const recipientBalance = await Token2.balanceOf(recipient.address);
        expect(recipientBalance).to.equal(amount);
    });

    it("should swap tokens from token2 to token1", async function() {
      const Token1 = await ethers.deployContract("Token1");
      await Token1.waitForDeployment();

      const Token2 = await ethers.deployContract("Token2");
      await Token2.waitForDeployment();

        const TokenSwapContract = await ethers.deployContract("SimpleSwap", [Token1.target, Token2.target]);
        await TokenSwapContract.waitForDeployment();


        const [owner, recipient] = await ethers.getSigners();

        // Mint some tokens for testing
        await Token2.transfer(owner.address, 1000);
        await Token1.transfer(TokenSwapContract.target, 1000);

        const amount = 100;

        await Token2.connect(owner).approve(TokenSwapContract.target, amount);
        await TokenSwapContract.connect(owner).swapToken2ToToken1(amount, recipient.address);

        const recipientBalance = await Token1.balanceOf(recipient.address);
        expect(recipientBalance).to.equal(amount);
    });

});


});

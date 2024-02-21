import { ethers } from "hardhat";

async function main() {

  const Token1 = await ethers.deployContract("Token1");
  await Token1.waitForDeployment();

  const Token2 = await ethers.deployContract("Token2");
  await Token2.waitForDeployment();

  const swap = await ethers.deployContract("SimpleSwap", [Token1.target, Token2.target]);
  await swap.waitForDeployment();

  console.log(
    `Token 1 deployed to ${Token1.target}`
  );

  console.log(
    `Token 2 deployed to ${Token2.target}`
  );
  
  console.log(
    `Swap contract deployed to ${swap.target}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

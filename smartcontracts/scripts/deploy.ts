import { ethers } from "hardhat";
import "dotenv/config";
import * as NFTenJson from "../artifacts/contracts/NFTen.sol/NFTen.json";

if (process.env.PRIVATE_KEY === "" && process.env.MNEMONIC === "") {
  console.warn("Must provide PRIVATE_KEY or MNEMONIC environment variable");
  process.exit(1);
}

if (process.env.INFURA_PROJECT_ID === "") {
  console.warn("Must provide INFURA_PROJECT_ID environment variable");
  process.exit(1);
}

async function main() {
  const provider = ethers.getDefaultProvider()

  const signers = await ethers.getSigners();
  const signer = signers[0]
  console.log(`Using address ${signer.address}`);
  
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);

  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log("Deploying NFTen contract");

  //  Use ABI, bytecode and signer to create contract factory
  const tokenFactory = new ethers.ContractFactory(
    NFTenJson.abi,
    NFTenJson.bytecode,
    signer
  );

  //  Deploy NFTen contract
  const tokenContract = await tokenFactory.deploy();
  console.log("Awaiting confirmations");

  //  Wait for block confirmations
  await tokenContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

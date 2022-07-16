import { ethers } from "ethers";
import "dotenv/config";
import * as NFTenJson from "../artifacts/contracts/NFTen.sol/NFTen.json";

if (process.env.PRIVATE_KEY === "" || process.env.MNEMONIC === "") {
  console.warn("Must provide PRIVATE_KEY or MNEMONIC environment variable");
  process.exit(1);
}

if (process.env.INFURA_PROJECT_ID === "") {
  console.warn("Must provide INFURA_PROJECT_ID environment variable");
  process.exit(1);
}

async function main() {
  //  Create wallet
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY!);

  console.log(`Using address ${wallet.address}`);

  //  Create provider and use Infura as provider
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJECT_ID
  );

  //  Create signer - connect wallet to provider
  const signer = wallet.connect(provider);

  //  Get account balance
  const balanceBN = await signer.getBalance();
  console.log(`balanceBN ${balanceBN}`);

  //  Format balance to ether
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

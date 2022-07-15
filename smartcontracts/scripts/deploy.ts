import { ethers } from "ethers"
import "dotenv/config"
import * as NFTenJson from "../artifacts/contracts/NFTen.sol/NFTen.json"

if (process.env.PRIVATE_KEY === "" || process.env.MNEMONIC === "") {
  console.warn("Must provide PRIVATE_KEY or MNEMONIC environment variable")
  process.exit(1)
}

if (process.env.INFURA_PROJECT_ID === "") {
  console.warn("Must provide INFURA_PROJECT_ID environment variable")
  process.exit(1)
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY!)
  console.log(`Using address ${wallet.address}`)
  const provider = new ethers.providers.InfuraProvider("ropsten", process.env.INFURA_PROJECT_ID)
  const signer = wallet.connect(provider)
  const balanceBN = await signer.getBalance()
  const balance = Number(ethers.utils.formatEther(balanceBN))
  console.log(`Wallet balance ${balance}`)
  if (balance < 0.01) {
    throw new Error("Not enough ether")
  }
  console.log("Deploying NFTen contract")
  const tokenFactory = new ethers.ContractFactory(NFTenJson.abi, NFTenJson.bytecode, signer)
  const tokenContract = await tokenFactory.deploy()
  console.log("Awaiting confirmations")
  await tokenContract.deployed()
  console.log("Completed")
  console.log(`Contract deployed at ${tokenContract.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

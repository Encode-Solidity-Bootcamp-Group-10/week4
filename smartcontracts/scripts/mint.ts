import { Contract, ethers } from "ethers"
import "dotenv/config"
import * as NFTenJson from "../artifacts/contracts/NFTen.sol/NFTen.json"
// eslint-disable-next-line node/no-missing-import
import { NFTen } from "../typechain-types"

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
  if (process.argv.length < 3) throw new Error("NFTen Contract address missing")
  const nftenAddress = process.argv[2]
  if (process.argv.length < 4) throw new Error("Mint number missing")
  const mintNumber = Number(process.argv[3])
  if (process.argv.length < 5) throw new Error("Address to Mint missing")
  const toAddress = process.argv[4]
  console.log(`Attaching Nften contract interface to address ${nftenAddress}`)
  const nftContract: NFTen = new Contract(nftenAddress, NFTenJson.abi, signer) as NFTen
  console.log(`Minting ${mintNumber} NFTs`)
  for (let index = 1; index <= mintNumber; index++) {
    const tx = await nftContract.safeMint(toAddress)
    await tx.wait()
    console.log(`NFT ${index} minted at Transaction Hash: ${tx.hash}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

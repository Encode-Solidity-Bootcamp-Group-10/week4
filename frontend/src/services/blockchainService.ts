import { ethers } from "ethers";
import TokenContract from "../assets/contracts/NFTen.json";

let provider: ethers.providers.BaseProvider;
let userWallet: ethers.Wallet;
let tokenContractInstance: ethers.Contract;

export function initBlockchainService() {
  provider = ethers.getDefaultProvider("ropsten");
  userWallet = ethers.Wallet.createRandom().connect(provider);
  tokenContractInstance = new ethers.Contract(
    String(process.env.REACT_APP_NFTEN_CONTRACT),
    TokenContract.abi
  ).connect(userWallet);
}

export async function getContractName() {
  const tokenName = await tokenContractInstance["name"]();
  return tokenName;
}

export async function getSymbol() {
  const symbol = await tokenContractInstance["symbol"]();
  return symbol;
}

export async function getTokenUriAtIndex(index: Number) {
  const tokenURI = await tokenContractInstance["tokenURI"](index);
  return tokenURI;
}

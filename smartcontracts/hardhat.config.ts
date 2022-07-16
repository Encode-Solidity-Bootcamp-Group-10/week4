import * as dotenv from "dotenv"
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  paths: { tests: "tests" },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}

export default config

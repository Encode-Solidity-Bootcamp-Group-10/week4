# Weekend Project Week 4

## 1-Documentation

<img width="782" alt="Screenshot 2022-07-17 at 10 25 31" src="https://user-images.githubusercontent.com/64858288/179392222-80d343d0-47b6-44a6-92ad-807f64972883.png">

## 2-SmartContract

### 2.1-Deploy NFT Contract (NFTen)

#### Execution

```
ts-node --files scripts/deploy.ts
```

#### Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Wallet balance 4.635473935900433
Deploying NFTen contract
Awaiting confirmations
Completed
Contract deployed at 0x9a498ddC44109026668743C3F084F3F26fc91C30
```

### 2.2-Verify NFT Contract (NFTen) Code at Etherscan

#### Execution

```
npx hardhat verify --network ropsten 0x9a498ddC44109026668743C3F084F3F26fc91C30
```

#### Console.log

```
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/NFTen.sol:NFTen at 0x9a498ddC44109026668743C3F084F3F26fc91C30
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFTen on Etherscan.
https://ropsten.etherscan.io/address/0x9a498ddC44109026668743C3F084F3F26fc91C30#code
```

### 2.3- Mint 10 NFTs

#### Execution

```
ts-node --files scripts/mint.ts "0x9a498ddC44109026668743C3F084F3F26fc91C30" 10 "0x4377CCB6c89659c47675a1f99315FCDDa9F48E0a"
```

#### Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Wallet balance 4.626609493859066
Attaching Nften contract interface to address 0x9a498ddC44109026668743C3F084F3F26fc91C30
Minting 10 NFTs
NFT 1 minted at Transaction Hash: 0x657e0688c47ef183a81ec0d3f2009543dffd57374194858a1f9bfe7f54b4c95b
NFT 2 minted at Transaction Hash: 0x13248529474df666ec7c78e7d729d8b0f8f45c5d1221b554cfcdf39605d8b0cd
NFT 3 minted at Transaction Hash: 0x0f4d74e427734ebe10af386831b510fd89f33f42999555230cd85255888b979d
NFT 4 minted at Transaction Hash: 0xfcb8dcd2a5ddfc122b96c04875d6e686c302ea6cc26c07ff27b14022dd6f088a
NFT 5 minted at Transaction Hash: 0x88cdb00412c38c2cca04babef6ac839aa5b85cb8dfdc01c6767ba968f00da472
NFT 6 minted at Transaction Hash: 0x763a6f2037846b52f0d9366a84829004d1f5dd251b353f3b4cc5acb7f2dc743f
NFT 7 minted at Transaction Hash: 0x7d8f0f2adb4edb7cfec5252f8942aa599ccded36cca5aefdd451f0de5e43b23a
NFT 8 minted at Transaction Hash: 0xc8530f7f55a8b1b8cdf2752e9c1068354019c6cdad1b342ae5535c1d0f2d41ed
NFT 9 minted at Transaction Hash: 0x21cb13a31549e5e5f1e1e4f96fb6d9b627aa5dc6cc8066122d2b02fa000cbd99
NFT 10 minted at Transaction Hash: 0x8c156c5d697bb35bd9f187705186f70ef5c6c610d623ed5f6c6655ec8b5d2750
```

#### The baseURL for each tokenURI is http://localhost:3000/api/nften/

#### The tokenURI method of the contract returns:

    ```
    http://localhost:3000/api/nften/0
    http://localhost:3000/api/nften/1
    http://localhost:3000/api/nften/2
    http://localhost:3000/api/nften/3
    http://localhost:3000/api/nften/4
    http://localhost:3000/api/nften/5
    http://localhost:3000/api/nften/6
    http://localhost:3000/api/nften/7
    http://localhost:3000/api/nften/8
    http://localhost:3000/api/nften/9
    ```

## 3-Backend
![image](https://user-images.githubusercontent.com/1132603/179391378-79e823da-21b9-46f7-80bc-32268433651b.png)

## 4-Frontend
![image](https://user-images.githubusercontent.com/1132603/179392272-bbe011ba-a4d4-4c28-99f2-724395683caf.png)

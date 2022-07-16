import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Progress,
  Alert,
} from "reactstrap";
import TokenContract from "./assets/contracts/NFTen.json";
import { ethers } from "ethers";

function App() {
  const [token, setToken] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenMetadatas, setTokenMetadatas] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState("");

  let provider = ethers.getDefaultProvider("ropsten");
  let userWallet = ethers.Wallet.createRandom().connect(provider);
  let tokenContractInstance;

  async function getNFTs() {
    try {
      let localTokenMetadatas: any = [];
      setTokenMetadatas([]);
      const totalSupply = parseInt(
        String(process.env.REACT_APP_TOTAL_SUPPLY),
        10
      );

      tokenContractInstance = new ethers.Contract(
        String(process.env.REACT_APP_NFTEN_CONTRACT),
        TokenContract.abi
      ).connect(userWallet);

      const tokenName = await tokenContractInstance["name"]();
      setToken(tokenName);

      const symbol = await tokenContractInstance["symbol"]();
      setSymbol(symbol);

      for (let i = 0; i < totalSupply; i++) {
        const tokenURI = await tokenContractInstance["tokenURI"](i);
        const response = await fetch(tokenURI);
        const resJson = await response.json();
        localTokenMetadatas.push(resJson);
        setPercentage(100 * ((i + 1) / totalSupply));
      }
      setTokenMetadatas(localTokenMetadatas);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <div className="App">
      {error.length > 0 && (
        <div className="row">
          <Alert color="danger">{error}</Alert>
        </div>
      )}
      <div className="row">
        <div className="col text-center">
          <h1>
            {token} {symbol && symbol.length > 0 && symbol}
          </h1>
          <hr />
        </div>
      </div>
      <div className="row">
        {percentage !== 0 && percentage < 100 && (
          <div>
            <Progress animated value={percentage} color="dark" />
            <small className="text-center">Loading NFTs...</small>
          </div>
        )}
        {tokenMetadatas.map((tokenMetadatas, index) => {
          const { name, description, cid, attributes } = tokenMetadatas;
          const imageUrl = `https://ipfs.io/ipfs/${cid}`;
          return (
            <div key={index} className="col">
              <Card
                className="mt-3"
                style={{
                  width: "23rem",
                }}
              >
                <img alt="Card image" src={imageUrl} />
                <CardBody>
                  <CardTitle tag="h5">{name}</CardTitle>
                  <CardText>{description}</CardText>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

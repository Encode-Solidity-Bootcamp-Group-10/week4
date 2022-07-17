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
import * as blockchainService from "./services/blockchainService";
import * as webService from "./services/webService";

function App() {
  const [token, setToken] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenMetadatas, setTokenMetadatas] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [error, setError] = useState("");

  async function getNFTs() {
    try {
      let tempMetadatas: any = [];
      const totalSupply = parseInt(
        String(process.env.REACT_APP_TOTAL_SUPPLY),
        10
      );

      //  Get token name from contract
      const tokenName = await blockchainService.getContractName();
      setToken(tokenName);

      //  Get token symbol from contract
      const symbol = await blockchainService.getSymbol();
      setSymbol(symbol);

      for (let i = 0; i < totalSupply; i++) {
        //  Get token uri from contract
        const tokenURI = await blockchainService.getTokenUriAtIndex(i);

        //  Get metadata using tokenUri from server
        const metadata = await webService.get(tokenURI);

        tempMetadatas.push(metadata);
        setLoadingPercentage(100 * ((i + 1) / totalSupply));
      }

      setTokenMetadatas(tempMetadatas);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => {
    blockchainService.initBlockchainService();
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
        {loadingPercentage !== 0 && loadingPercentage < 100 && (
          <div>
            <Progress animated value={loadingPercentage} color="dark" />
            <small className="text-center">Loading NFTs...</small>
          </div>
        )}
        {tokenMetadatas.map((tokenMetadatas, index) => {
          const { name, description, cid } = tokenMetadatas;
          const imageUrl = `https://ipfs.io/ipfs/${cid}`;
          return (
            <div key={index} className="col">
              <Card
                className="mt-3"
                style={{
                  width: "23rem",
                }}
              >
                <img alt={name} src={imageUrl} />
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

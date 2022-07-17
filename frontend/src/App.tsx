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
import {
  init,
  getContractName,
  getSymbol,
  getTokenUriAtIndex,
} from "./services/blockchainService";
import { get } from "./services/webService";

function App() {
  const [token, setToken] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenMetadatas, setTokenMetadatas] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState("");

  async function getNFTs() {
    try {
      let localTokenMetadatas: any = [];
      const totalSupply = parseInt(
        String(process.env.REACT_APP_TOTAL_SUPPLY),
        10
      );

      setTokenMetadatas([]);

      const tokenName = await getContractName();
      setToken(tokenName);

      const symbol = await getSymbol();
      setSymbol(symbol);

      for (let i = 0; i < totalSupply; i++) {
        const tokenURI = await getTokenUriAtIndex(i);
        const resJson = await get(tokenURI);
        localTokenMetadatas.push(resJson);
        setPercentage(100 * ((i + 1) / totalSupply));
      }

      setTokenMetadatas(localTokenMetadatas);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => {
    init();
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

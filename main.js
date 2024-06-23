// src/App.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import simpleContractABI from "./artifacts/contracts/SimpleContract.sol/SimpleContract.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const simpleContractABI = simpleContractABI.abi;

function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getWallet();
  }, []);

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      handleAccounts(accounts);
    }
  };

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      getContract(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectWallet = async () => {
    if (!ethWallet) return alert("MetaMask wallet is required to connect");

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccounts(accounts);
  };

  const getContract = (account) => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, simpleContractABI, signer);

    setContract(contractInstance);
    loadContractData(contractInstance);
  };

  const loadContractData = async (contractInstance) => {
    const message = await contractInstance.getMessage();
    const counter = await contractInstance.getCounter();
    setMessage(message);
    setCounter(counter.toNumber());
  };

  const updateMessage = async () => {
    if (contract) {
      const newMessage = prompt("Enter new message:");
      const tx = await contract.setMessage(newMessage);
      await tx.wait();
      loadContractData(contract);
    }
  };

  const incrementCounter = async () => {
    if (contract) {
      const tx = await contract.incrementCounter();
      await tx.wait();
      loadContractData(contract);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Contract Interaction</h1>
        {!account ? (
          <button onClick={connectWallet}>Connect MetaMask</button>
        ) : (
          <div>
            <p>Connected Account: {account}</p>
            <p>Message: {message}</p>
            <p>Counter: {counter}</p>
            <button onClick={updateMessage}>Update Message</button>
            <button onClick={incrementCounter}>Increment Counter</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

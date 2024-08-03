import { useState, useEffect } from "react";
import { ethers } from "ethers";
import votingSystem_abi from "../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

const VotingPage = () => {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [votingSystem, setVotingSystem] = useState(undefined);
  const [votingSessions, setVotingSessions] = useState({});
  const [title, setTitle] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const contractAddress = "0x..."; // Replace with the deployed contract address
  const votingSystemABI = votingSystem_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getVotingSystem();
  };

  const getVotingSystem = async () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const votingSystemContract = new ethers.Contract(contractAddress, votingSystemABI, signer);
    setVotingSystem(votingSystemContract);
  };

  const getVotingSessions = async () => {
    if (votingSystem) {
      const sessions = await votingSystem.getVotingSession(account);
      setVotingSessions(sessions);
    }
  };

  const createVotingSession = async () => {
    if (votingSystem) {
      try {
        const tx = await votingSystem.createVotingSession(title, startTime, endTime);
        await tx.wait();
        getVotingSessions();
      } catch (error) {
        console.error("Transaction error:", error);
      }
    }
  };

  const addCandidate = async () => {
    if (votingSystem) {
      try {
        const tx = await votingSystem.addCandidate(selectedSession, candidateName);
        await tx.wait();
        getVotingSessions();
      } catch (error) {
        console.error("Transaction error:", error);
      }
    }
  };

  const vote = async () => {
    if (votingSystem) {
      try {
        const tx = await votingSystem.vote(selectedSession, selectedCandidate);
        await tx.wait();
        getVotingSessions();
      } catch (error) {
        console.error("Transaction error:", error);
      }
    }
  };

  const handleCreateSession = () => {
    createVotingSession();
  };

  const handleAddCandidate = () => {
    addCandidate();
  };

  const handleVote = () => {
    vote();
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this Voting System.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (!votingSystem) {
      getVotingSystem();
    }

    if (!votingSessions) {
      getVotingSessions();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <h2>Create Voting Session</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button onClick={handleCreateSession}>Create Session</button>
        <h2>Add Candidate</h2>
        <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
        {Object.keys(votingSessions).map((session, index) => (
          <option key={index} value={session}>
            {session}
          </option>
        ))}
        </select>
        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <button onClick={handleAddCandidate}>Add Candidate</button>
        <h2>Vote</h2>
        <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
          {Object.keys(votingSessions).map((session, index) => (
            <option key={index} value={session}>
              {session}
            </option>
          ))}
        </select>
        <select value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
          {votingSessions[selectedSession] && votingSessions[selectedSession].candidates.map((candidate, index) => (
            <option key={index} value={candidate.name}>
              {candidate.name}
            </option>
          ))}
        </select>
        <button onClick={handleVote}>Vote</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Voting System!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}</style>
    </main>
  );
};

export default VotingPage;
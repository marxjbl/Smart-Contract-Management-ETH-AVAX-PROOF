# Voting System Dapp

This project demonstrates a simple Ethereum-based decentralized application (Dapp) using a Solidity smart contract and a web frontend to interact with it. The contract includes functions for creating voting sessions, adding candidates, and voting.

## Description

The Voting System contract allows users to:
- Create voting sessions with a title, start time, and end time.
- Add candidates to a voting session.
- Vote for a candidate in a voting session.
- Check the current voting sessions and candidates.

The frontend application interacts with the smart contract, displaying the current voting sessions and candidates, and providing buttons to perform create session, add candidate, and vote actions.

## Features

- **Smart Contract Functions**: The contract includes `createVotingSession`, `addCandidate`, and `vote` functions.
- **Error Handling**: The contract uses `require`, `assert`, and `revert` statements to ensure safe operations.
- **Frontend Integration**: The web application shows the current voting sessions and candidates, and allows users to interact with the contract functions.

## Usage

1. Clone the repository.
2. Deploy the smart contract to an Ethereum network (e.g., using Remix).
3. Replace the ABI and contract address in `VotingPage.js` with your contract's ABI and address.
4. Open the web application and connect your MetaMask wallet.
5. Use the buttons to interact with the contract.

## Setup Instructions

After cloning the GitHub repository, follow these steps to get the code running on your computer:

1. Inside the project directory, open the terminal and type:
    ```sh
    npm i
    ```
2. Open the web application by typing:
    ```sh
    npm run dev
    ```
    This will launch the front-end.

3. After this, the project will be running on your localhost, typically at [http://localhost:3000](http://localhost:3000).

## Author

Marx Lizardo  
[LinkedIn](https://www.linkedin.com/in/marxjbl/)
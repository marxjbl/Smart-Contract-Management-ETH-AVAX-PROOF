# Assessment Dapp

This project demonstrates a simple Ethereum-based decentralized application (Dapp) using a Solidity smart contract and a web frontend to interact with it. The contract includes functions for depositing, withdrawing, transferring, and checking balances.

## Description

The Assessment contract allows users to:
- Deposit Ether into their account.
- Withdraw Ether from their account.
- Transfer Ether to another account.
- Check their account balance.

The frontend application interacts with the smart contract, displaying the balance and providing buttons to perform deposit, withdrawal, and transfer actions.

## Features

- **Smart Contract Functions**: The contract includes `getBalance`, `deposit`, `withdraw`, and `transfer` functions.
- **Error Handling**: The contract uses `require`, `assert`, and `revert` statements to ensure safe operations.
- **Frontend Integration**: The web application shows the balance and allows users to interact with the contract functions.

## Usage

1. Clone the repository.
2. Deploy the smart contract to an Ethereum network (e.g., using Remix).
3. Replace the ABI and contract address in `index.js` with your contract's ABI and address.
4. Open the web application and connect your MetaMask wallet.
5. Use the buttons to interact with the contract.

## Setup Instructions

After cloning the GitHub repository, follow these steps to get the code running on your computer:

1. Inside the project directory, open the terminal and type:
    ```sh
    npm i
    ```
2. Open two additional terminals in your VS Code.

3. In the second terminal, type:
    ```sh
    npx hardhat node
    ```

4. In the third terminal, type:
    ```sh
    npx hardhat run --network localhost scripts/deploy.js
    ```

5. Back in the first terminal, type:
    ```sh
    npm run dev
    ```
    This will launch the front-end.

6. After this, the project will be running on your localhost, typically at [http://localhost:3000](http://localhost:3000).

## Authors

Marx Lizardo  
[LinkedIn](https://www.linkedin.com/in/marxjbl/)

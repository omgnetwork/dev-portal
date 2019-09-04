---
id: send-your-first-transaction
title: Send your first transaction
sidebar_label: Send your first transaction
---


## Introduction

This guide introduces you to the Plasma interface and shows you how to make transactions directly from a browser.

* Learn about plasma transactions from end-to-end.
* Gain practical experience interacting with Plasma.
* Make a deposit, transact and exit.

> This guide is intended for **Samrong** and any v0.2 instance of OmiseGO Network.


## Read this first!

The OMG token contract follows the ERC20 standard, which means OMG is decentralised and the contract owner has no control over it.

Only you can keep your tokens safe. Please ensure you understand how to safely store and send tokens before making any transactions, always double check that you are sending to the correct address, and never send your private keys to anyone. Anyone who has your private keys can, and probably will, take your money.

|If you've sent your tokens to ...   | Outcome |
| ------------- | ------------- |
| The OMG smart contract address  | It's not possible to make transactions from the contract address; your tokens are lost to all  |
| The wrong token address on an exchange  | You can try contacting the exchange with the details of your transaction, but OmiseGO has no power to reverse the transaction or force the exchange to return your tokens.  |
| A scammer  | There's nothing we can do to get your tokens back. We do our best to report scam accounts, so feel free to let us know if you see a suspicious account or website, but we can’t catch them all and can’t take responsibility for their actions. |
| Some other address that you don’t have access to | No one except the holder of the private keys associated with that address will be able to help you get your tokens back. Unless the person who received them is exceptionally honest and decides to give them back, those tokens are lost for good.

## Initial setup
For the initial set up, you'll need to install a few things, and you'll need a code editor, a browser, and a web3 wallet.

### Before you start
* Install node-js >10.0.0
* Install npm > 6.0.0
* You will need access to a code editor.
* You will need access to a browser with a web3 wallet, such as MetaMask.


### Install and start the app

**Perform these steps:**

1. Clone the latest version of `js-starter-kit` onto your local machine. You can find the repo at https://github.com/omisego/js-starter-kit
2. In a text editor, open up the `config.js`.
3. Replace the current configs in `config.js` with the network endpoints for Samrong, at https://github.com/omisego/dev-portal/blob/master/guides/network_endpoints.md; then, save the file.
4. To install all dependencies, run `npm install`
5. To start the app, run `npm run dev`

### Fund, Deposit, Transact, and Exit

This section guides you through the end-to-end process for transacting on the OmiseGO Network. 

You'll learn how to fund your wallet, make a deposit, transact, and exit.

#### Step 1: Fund the wallet on the Root chain
1. To run the JS-Starter-kit, send yourself some Rinkeby Testnet ETH. 
The client-side wallet relies on the funds you have on your existing account. You'll use these funds to make transactions.

2. Click **Refresh**. The Rinkeby ETH that you own displays in your account.



#### Step 2: Make a deposit
1. Click **Deposit**.
2. Define the amount you wish to deposit, in Wei.
3. Click **OK**. A system message confirms your transaction.
4. Click **Confirm**. 
   You may need to wait for around 2-3 minutes, depending on network congestion.
5. Click **Refresh**. The balance refreshes, and updates.

#### Step 3: Make a transaction
1. Click **Transfer**.
2. Fill out the amount you wish to transfer, and the recipient's address. 
Recipient address can be another wallet you own on MetaMask.
3. Click **OK**. A system message confirms that you're signing in.
4. Verify the inputs and outputs of your transactions to ensure they're accurate.
5. Click **Confirm**.

> **How to view transaction status**
>
> To view the status of your transaction, you can also open up your browser console and retrieve the TX hash. Search for the hash via the [Plasma Block Explorer](http://quest.samrong.omg.network) to view the transaction details.


#### Step 4: Exit the UTXO
1. Once you're done with your transaction, click **Exit**.
2. Select the UTXO that you would like to exit.
3. Click **OK**. 







	
	
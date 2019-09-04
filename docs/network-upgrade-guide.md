---
id: network-upgrade-guide
title: Network upgrade guide
sidebar_label: Network upgrade guide
---



## OVERVIEW
This page provides a guide to migrating your funds from one Plasma chain (Ari) to another (Samrong), and helper scripts to run the migration process. 

_Note: This guide and the accompanying helper scripts are released under the Apache License 2.0._


## ABOUT THIS UPGRADE
The first version of the OMG Network is the Plasma chain known as _Ari_ (v0.1, launched February 2019). This upgrade requires that you migrate your funds to the second version of the OMG Network, which we’ve named _Samrong_.


## WHY UPGRADE 
This upgrade requires a change to the immutable smart contract on _Ari_. For this reason, _Samrong_ will eventually replace Ari entirely. If you wish to continue using the OMG Network, you will need to move your Rinkeby ETH (Ethereum) and ERC20 from Ari to Samrong.


## Benefits
Samrong includes a number of significant modifications:  

* Improved Plasma integration, and changes to Plasma smart contracts

  Ari launched with Minimum Viable Plasma. Samrong builds on Ari’s Minimum Viable Plasma, and runs on More Viable Plasma 
  (MoreVP). Samrong’s Plasma smart contract will thus be MoreVP compliant, but since the written smart contract can’t be 
  modified, Samrong is implemented as a new, separate network, and will replace Ari.

* Greater resilience, less downtime

  Samrong’s improved monitoring, reliability, and stability is better at handling high network loads.
 
* New transaction signature using EIP 712

  Samrong allows you to sign transactions using the EIP-712 standard, which allows signatures to be carried out through wallet  
  integrations, such as Metamask. EIP-712 also allows Ethereum signatures to display in a structured and readable format. 

* Meta-data field

  A new meta-data field allows users or dApps (decentralized applications) to store any information in their transactions. 




## Before you start 
Important! This guide provides steps for a specified, example scenario, and it is recommended that you only perform this procedure on a test (staging) system. 


## Criteria
To use these upgrade instructions and helper scripts, you must meet the following criteria: 

* You are migrating funds from one wallet.
  Note: If you need to migrate funds from two or more wallets, you will need to run the scripts with different config that 
  points to those wallets, or implement your own solution …

* The chain from which you are upgrading is secure and stable, and it is still possible to make transactions on this chain.
  Note: It will not be possible to upgrade if the chain you’re upgrading from has gone byzantine. In this case  you will have  
  to skip the merge transactions and perform exits manually on every single UTXOs … 

* You are only migrating ETH.

* You have access to your raw private key. 


 
## GETTING STARTED

Ensure you have node.js and npm installed on your machine. To do this:
1. Locate the upgrade scripts repository at https://github.com/omisego/plasma-upgrade-scripts; then, clone this upgrade  
   scripts repository onto your machine.

2. Inside the project root directory, run the following command to install all required dependencies: 
   ```
   npm install
   ```



## MIGRATE YOUR FUNDS
Migrating your funds involves the following tasks: 

1. Define values for the variables in the config file
2. Merge all your UTXOs (Unspent Transaction Output) into one UTXO.
3. Start exit on the smart contract.
4. Process exit.
5. Deposit funds on Samrong (the new plasma chain).



### STEP 1:  Configure values for variables in the config file

1. Navigate to the config.js file on your local computer. 

2. Open the file; then, define values for these variables: 

 ```
  let variables = {
    ADDRESS: "<WALLET_ADDRESS>",
    PRIVATEKEY: "<WALLET_PRIVATE_KEY>",
    ETH_CLIENT: "<ETHEREUM_NODE>",
    WATCHER: "<WATCHER_URL>",
    OLD_CONTRACT: "<OLD_ROOTCHAIN_PLASMA_CONTRACT>",
    NEW_CONTRACT: "<NEW_ROOTCHAIN_PLASMA_CONTRACT>",
    DEPOSIT_AMOUNT: <AMOUNT_TO_REDEPOSIT_IN_WEI>
  }
   ```
   
3. Save the file.


### STEP 2:   Merge all your UTXOs
         
> **Warning!** *The gas cost of calling exits on your UTXOs will grow linearly. For this reason, it is recommended that you consolidate all your UTXOs into one before calling exits. The current implementation of UTXO consolidation is done through a convenience library that allows you to chain transactions together. However, we strongly recommend that you do not make transactions in it because it assumes trust in the operator.* 

In a production setting where you assume zero trust in the operator, you will want to make sure each merge transaction gets confirmed on the root chain. For brevity, we are simply going to chain these transactions together. 

To merge, run the following command:
  ```
  npm run consolidate
  ```


### STEP 3:   Start exit
Now that you have only one UTXO, it’s time to call an exit on the smart contract:

1. Ensure you have some ETH on the rootchain. 

2. To call startStandardExit() on the rootchain contract, run the following command:
   ```
   npm run exit
   ```

3. Wait until the challenge period is done. 
   Note: Depending on the network, you’ll have to wait until the challenge period is complete before that transaction can be  
   finalized. Find out more about the challenge period on Ari, here:      
   https://github.com/omisego/dev-portal/blob/master/guides/network_endpoints.md.

3. Verify that your transaction is finalized. 
 _Note: You can do this on Etherscan, or at any other block explorer._ 



### STEP 4:  Process exit to move your funds back into your account
Once the challenge period ends, call processExit on the rootchain to move your funds back into your account:

1. On the rootchain, run the following command:
   ```
   npm run process
   ```

   A transaction hash is returned. 


2. On an Ethereum block explorer, verify that your funds have moved from the Plasma contract to your wallet in your Ethereum    
   account. 
   
 > **Important!**  *This script processes a single UTXO. Due to the nature of exit queue, you may have to process more than one to get your funds back if there are a couple of UTXOs inside the queue.*



### STEP 5:  Deposit your funds back on your account
Now that your funds are back safely in your Ethereum account, deposit the funds into the newest version of the child chain; in this case, Samrong:

1. To perform a deposit, run the following command: 
   ```
   npm run deposit
   ```

2. Wait for root chain confirmations.

3. Now you can make transactions on the new chain.




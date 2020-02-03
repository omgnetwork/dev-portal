# Getting Stated with Plasma Wallet UI

## Goals
- To understand plasma transactions from a user standpoint.
- To get first hand experience in making interactions with plasma.
- To learn the process of making `deposit`, `transact` and `exit`.

This is an example client side wallet built in Vue.js which allows you to make interactions with the OMG network from the browser.

## Prerequisites
* Linux or MacOS system
* [node-js](https://nodejs.org/en/) >10.0.0
* [npm](https://www.npmjs.com/get-npm) > 6.0.0
* Code editor (e.g. [Visual Studio Code](https://code.visualstudio.com/download))
* Browser with a web3 wallet, preferrably [MetaMask](https://metamask.io). Currently Metamask is supported by Chrome, Firefox, Opera and Brave.

## Note

This guide is meant for **Samrong** and any v0.2 instance of OMG Network.

## Wallet Setup
### 1. Clone `js-starter-kit` to your local machine

```
git clone https://github.com/omisego/js-starter-kit
```

### 2. Edit configs
 
* Open up the `config.js` on your text editor.
* Replace the current configs in `config.js` with the  [the current Network Endpoints for Samrong](https://github.com/omisego/dev-portal/blob/master/guides/network_endpoints.md). 
* Save the file.

Notice, the endpoints have to be divided with commas and have the following names:

```
const localConfig = {
  plasmaContractAddress: "0x740ecec4c0ee99c285945de8b44e9f5bfb71eea7",
  childchainUrl: "https://samrong.omg.network/",
  watcherUrl: "https://watcher.samrong.omg.network/",
  web3ProviderUrl: "https://rinkeby.infura.io/"
};

module.exports = localConfig;
```

### 4. Install project dependencies 

Run `npm install`. If you encounter some errors during the installation, chances are you're using an operating system that is not copatible with the current wallet setup.

### 5. Start the app 

Run `npm run dev` in your code editor.

### 6. Configure Metamask
If the build was successful, you should see a Metamask pop-up in your browser. Simply choose `Connect` and you'll be redirected to OmiseGo Wallet.

![](https://i.imgur.com/YdaFpp9.png)

JS-starter-kit works with [Rinkeby Testnet](https://www.rinkeby.io), so make sure to switch to this network in your Metamask.

![](https://i.imgur.com/Et2KUin.png)

## Working with Wallet

### 1. Funding the wallet on the Root chain

1.1. the clientside wallet will rely on the funds you have on your existing account. In order to run the JS-Starter-kit, make sure you have sent yourself some Rinkeby Testnet ETH. We will use that later to make transactions.

1.2 click the refresh button, you should see the Rinkeby ETH that you own in your account

### 2. Deposit

2.1. Click on the DEPOSIT button, choose the amount you would like to deposit in Wei. Click okay. There should be a pop up to confirm your transaction. Click confirm.

2.2. Here you will have to wait for about 2-3 minutes depending on the network congestion. You can refresh balance via the [refresh] button. After a while, your balance will be updated

### 3. Transact

3.1. Click on the TRANSFER button. Fill in the amount you would like to transfer, including the address of the recipient- this can be another wallet you own on MetaMask. Click Okay and there should be a popup that shows the message you are trying to sign- here you can inspect the inputs and outputs of your transactions. After making sure this is accurate, click Confirm.

3.2. To see the status of your transaction. You could also open up your browser console and retrieve the TX hash, by searching for the hash through [Plasma Block Explorer](http://quest.samrong.omg.network) you should see the details of the transaction.


### 4. Exit

4.1. Once you are done, simply click on the EXIT button and select the UTXO that you would like to exit and click on Okay.

Congratulations, you have now gone through the end-to-end process of making transactions on the OMG Network.

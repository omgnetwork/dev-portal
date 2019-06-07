# Get to know the Plasma Interface

Estimated time: 5 minutes

Goal:

- To understand plasma transactions from end-to-end
- To get first hand experience in making interactions with plasma
- To learn the process of making `deposit`, `transact` and `exit`

In this guide, we will introduce to you the Plasma Interface by making transactions directly from your browser. Just make sure you have the following installed:
1. node-js >10.0.0
2. npm > 6.0.0

Have access to a code editor, browser with a web3 wallet like MetaMask

### Note

This guide is meant for **Samrong** and any v0.2 instance of OMG Network

### Initial Setup
1. Clone the latest version of `js-starter-kit` onto your local machine. The repo can be found here https://github.com/omisego/js-starter-kit

2. Open up the `config.js` on your text editor

3. Replace the current configs in `omg-wallet.js` with the  [following Network Endpoints for Samrong](https://github.com/omisego/dev-portal/blob/master/guides/network_endpoints.md) then save the file.

4. install all the dependencies `npm install`

5. start the app up by running `npm run dev`

#### 1. Funding the wallet on the Root chain

1.1. the clientside wallet will rely on the funds you have on your existing account. In order to run the JS-Starter-kit, make sure you have sent yourself some Rinkeby Testnet ETH. We will use that later to make transactions.

1.2 click the refresh button, you should see the Rinkeby ETH that you own in your account

#### 2. Deposit

2.1. Click on the DEPOSIT button, choose the amount you would like to deposit in Wei. Click okay. There should be a pop up to confirm your transaction. Click confirm.

2.2. Here you will have to wait for about 2-3 minutes depending on the network congestion. You can refresh balance via the [refresh] button. After a while, your balance will be updated

#### 3. Transact

3.1. Click on the TRANSFER button. Fill in the amount you would like to transfer, including the address of the recipient- this can be another wallet you own on MetaMask. Click Okay and there should be a popup that shows the message you are trying to sign- here you can inspect the inputs and outputs of your transactions. After making sure this is accurate, click Confirm.

3.2. To see the status of your transaction. You could also open up your browser console and retrieve the TX hash, by searching for the hash through [Plasma Block Explorer](http://quest.samrong.omg.network) you should see the details of the transaction.


#### 4. Exit

4.1. Once you are done, simply click on the EXIT button and select the UTXO that you would like to exit and click on Okay.

Congratulations, you have now gone through the end-to-end process of making transactions on the OMG Network.

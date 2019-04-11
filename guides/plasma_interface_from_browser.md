# Get to know the Plasma Interface

Estimated time: 5 minutes

Goal:

- To understand plasma transactions from end-to-end
- To get first hand experience in making interactions with plasma
- To learn the process of making `deposit`, `transact` and `exit`

In this guide, we will introduce to you the Plasma Interface by making transactions directly from your browser. Just make sure you have `Git` installed and have access to a code editor. No need to install any dependencies.

### Initial Setup
1. Clone `js-starter-kit` onto your local machine. The repo can be found here https://github.com/omisego/js-starter-kit

2. Open up the `omg-wallet.js` on your text editor

3. Replace the current configs in `omg-wallet.js` with the  [following Network Endpoints](https://github.com/omisego/dev-portal/blob/master/guides/network_endpoints.md) then save the file.

#### 1. Creating and funding the wallet
1.1. First, open up your browser and navigate to the file `index.html`

1.2. Click on [create wallet] button, make sure to write down your seed phrase somewhere

1.3. Send some Rinkeby ETH to your newly generated browser wallet from Metamask or whichever wallet you have

#### 2. Deposit

2.1. Put your address in *From address:* field and put the amount to deposit inside the *value* field. Click [Send] button.

2.2. Here you will have to wait for about 2-3 minutes depending on the network congestion. You can refresh balance via the [refresh] button. After a while, your balance will be updated

#### 3. Transact

3.1. Add the inputs to the `Transfer` fields, click send. Depending on the network congestion, you might have to wait up for 10-15 seconds before clicking [refresh], and the balance will get updated.

3.2. To see the status of your transaction. You could also open up your browser console and retrieve the TX hash, by searching for the hash through [Plasma Block Explorer](http://quest.omg.network) you should see the details of the transaction.


#### 4. Exit

4.1. Once you are done, simply put the address of the funds you would like to exit and click on [exit]

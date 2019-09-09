---
id: omisego-network-resources
title: OmiseGO Network Rresources
sidebar_label: OmiseGO Network Resources
---


## OMG-JS 

OMG-JS is the OmiseGO Javascript library you use for communicating with OmiseGo's MoreVP implementation of Plasma, and provides the following functions:

* Deposit (Eth/Token) from the RootChain into the ChildChain.
* Transact on the ChildChain.
* Exit from the ChildChain back to the RootChain.
* Challenge an invalid exit.

Javascript style guide resources:
* https://standardjs.com
* https://github.com/standard/standard




### Compatibility

This library is currently compatible with version 0.2 of the OMG Network

### Project submodules

The project is organized into 3 submodules:

1. @omisego/omg-js-rootchain
2. @omisego/omg-js-childchain
3. @omisego/omg-js-util

You can use any of them separately, or all at once by importing the parent `@omisego/omg-js` package.


### Installation

#### Node
Requires Node >= 8.11.3
```
npm install @omisego/omg-js
```


#### Browser
Copy the `dist/omg.js` file into your project and include it.
```
<script type="text/javascript" src="omg.js"></script>
```
> See the OMG-JS API documentation at [Documentation for omg-js ](http://omisego.github.io/omg-js)


### Signing transactions

The OmiseGO Network child chain uses `eth_signTypedData`, as described in [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md)

This means that a web3 provider, such as Metamask, can do the signing.

#### Create and sign a transaction with `eth_signTypedData`

This section describes how to create and sign a transaction using `eth_signTypedData`

**Perform the following steps:**

1. Create the transaction body by specifying inputs, outputs and optional metadata.
2. Convert the transaction body into typedDataformat.
3. Call `eth_signTypedData` to sign it.

    Note: You must JSON.stringify() the typed data.

4. Assemble the signatures and the transaction body into an RLP encoded format.
5. Submit the transaction to the child chain.

```
    // create the transaction body
    const txBody = transaction.createTransactionBody(fromAddress, fromUtxos, toAddress, toAmount, currency)

    // Get the transaction typed data
    const typedData = transaction.getTypedData(txBody, verificationContract)

    // Sign the typed data
    const signatures = await new Promise((resolve, reject) => {
      web3.currentProvider.sendAsync(
        {
          method: 'eth_signTypedData_v3',
          params: [signer, JSON.stringify(typedData)],
          from: signer
        },
        (err, result) => {
          if (err) {
            reject(err)
          } else if (result.error) {
            reject(result.error.message)
          } else {
            resolve(result.result)
          }
        }
      )
    })

    // Build the signed transaction
    const signedTx = childchain.buildSignedTransaction(typedData, signatures)

    // Submit transaction
    const tx = await childchain.submitTransaction(signedTx)
```

#### Create and sign a transaction without `eth_signTypedData`
This section describes how to create and sign a transaction without `eth_signTypedData`.

There is no need to use `eth_signTypedData` if you're self-managing your private keys. Instead, you'll need to create a hash of the typed data and sign that using ecsign

You can use the following convenient function:  `childchain.signTransaction(typedData, privateKeys)`

Or you can do this manually:

1. Create the transaction body by specifying inputs, outputs and optional metadata.
2. Convert the transaction body `intotypedDataformat`.
3. Call `transaction.getToSignHash(typedData)` to get the hash to sign.
4. Sign it using elliptic curve signing (e.g.ecsign)
5. Assemble the signatures and the transaction body into an RLP encoded format.
6. Submit the transaction to the child chain.

```
    // create the transaction body
    const txBody = transaction.createTransactionBody(fromAddress, fromUtxos, toAddress, toAmount, currency)

    // Get the transaction typed data
    const typedData = transaction.getTypedData(txBody, verificationContract)

    // Get the hash to sign
    const toSign = transaction.getToSignHash(typedData)

    // Sign the hashed data (once for each input spent)
    const privateKeys = [...the private keys of the spent inputs...]
    const signatures = privateKeys.map(key => ecsign(toSign, key))

    // Build the signed transaction
    const signedTx = childchain.buildSignedTransaction(typedData, signatures)

    // Submit transaction
    const tx = await childchain.submitTransaction(signedTx)
```

#### Examples

In this section we'll take a closer look at some example scenarios.

**Pre-requisites:**

Both Alice's and Bob's Ethereum accounts must contain some ETH, which is used for:
* gas costs on the RootChain
* fees on the ChildChain
* and the actual ETH transferred from Alice to Bob

**Before you start:**

1. Locate the example code in the GitHub examples directory, at omg-js/examples/
2. Run `nnpm install`
3. Edit the following file to define appropriate values: `config.js`


**Scenario between Alice and Bob:**

1. Alice must first deposit some ETH from the root chain into the child chain.

    To deposit ETH from Alice's root chain to the child chain:   `npm run childchain-deposit`

2. Then Alice will transfer some of that ETH to Bob on the child chain.

    To send ETH from Alice's child chain to Bob's child chain:  `npm run childchain-transaction`

> **Result:** Alice has now sent some ETH to Bob. To view both Alice and Bob's child chain UTXOs (the result of this transaction):  `npm run childchain-utxos`

3. Finally, Bob will exit his funds from the child chain back into the root chain. His root chain balance reflects the extra 1 ETH that Alice sent to him on the child chain.

    To exit (transfer) all of Bob's child chain funds to the root chain: `npm run childchain-exit`

> **Result:** Notice that Bob's final root chain balance is less than expected. This is because Bob had to pay root chain gas costs, and he had to pay to exit the `childchain.sign`

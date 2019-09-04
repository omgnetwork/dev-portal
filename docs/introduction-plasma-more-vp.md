---
id: introduction-plasma-more-vp
title: Introduction to Plasma (MoreVP)
---

## Overview
This page provides a high-level introduction to OmiseGO's implementation of More Viable Plasma (MoreVP), and explains how it works as a scaling solution.

## What is Plasma?
Plasma is a Layer 2 (i.e. off-chain) scaling solution for Ethereum. Compared to other Layer 2 solutions, Plasma's advantage is that every block on the Plasma (or child) chain is committed to the root chain. This means that if anything goes wrong on the child chain, honest users will always be able to exit the child chain and recover their funds on the root chain.

There are several versions of Plasma, including MoreVP, which is OmiseGO's chosen solution. 
Different versions of Plasma are suited to specific use cases and the operator (OmiseGO in this case) typically chooses the most suitable version for their scenario. From a users perspective, all versions of Plasma behave more or less the same.

Plasma is typically used for the following:

* Depositing funds from the root chain (Ethereum) into the child chain.
* Transacting on the child chain (sell, trade, transfer, etc.).
* Exiting remaining funds from the child chain back to the root chain.

## MoreVP architecture components
The table describes the components of the Plasma MoreVP architecture:
| Component | Description |
| ---       | ---         |
| Ethereum  | The root chain. |
| Child chain | Currently, in Proof of Authority mode, there is only one child chain service that implements the child blockchain. It is anticipated that this will change when OmiseGO network transitions to Proof of Stake. |
| Watcher | A service that monitors the child chain for suspicious activity, such as the operator or any user acting dishonestly. If the watcher discovers suspicious activity, it prompts users to challenge invalid exits, or to exit the child chain. Users can run their own Watcher, but it is also expected that some trusted entity will run Watchers as a service. |

## Deposit funds from the root chain
A *deposit* involves sending tokens (ETH, or any ERC20 token) to the Plasma RootChain contract on Ethereum.

The table describes the deposit method for ETH tokens compared to ERC20 tokens:
> For both ETH and any other ERC20 token, the tokens are held in the RootChain contract. After a finality period (currently 10 blocks), the same amount of corresponding tokens are available at your address on the child chain.

| Token type | How to deposit |
| ---        | ---            |
| ETH | Using ETH, you're sending the deposit directly to the root chain contract. In this case, call RootChain.deposit();  then, send an amount of ETH along with the transaction. |
| ERC20 | Using ERC20, you do not send the tokens directly to the root chain contract. Instead, approve the RootChain contract to transfer the amount of tokens you wish to deposit; then, call RootChain.depositFrom(). The contract transfers the tokens to itself. |

## Transact on the child chain
You can use tokens in transactions once you have them on the child chain. In MoreVP, the child chain is a UTXO-based blockchain, limited to 4 inputs and 4 outputs per transaction.

You can submit transactions directly to the child chain service via its RPC API; however it is more secure to submit them via the Watcher's API. The Watcher can ensure that the child chain is behaving correctly before submitting your transaction.

## Exit funds from the child chain back to the root chain
When exiting, you take tokens that you own on the child chain and 'move' them back out to the root chain.

Each UTXO that you own must be exited separately. It is recommended that you consolidate your UTXOs to reduce the number of exits you'll need to perform.

## How to exit a UTXO
1. Call RootChain.startStandardExit() on Ethereum.
2. Wait for the 'challenge' period (described below).
3. If there are no challenges in this period, the tokens are released from the root chain contract back
to your account.

## Exit protocol
*Exit protocol" refers to the process of exit, challenge, and response that may occur when exiting. The exit protocol protects honest users from bad actors on the child chain.

### Example: Alice attempts to steal tokens from the child chain

**Scenario**

User attempts to steal tokens they sent to another user on the child chain.

* Alice sends Bob tokens on the child chain.
* Alice attempts to exit those same tokens.

**Solution**

To prevent the theft of tokens on the child chain, Alice's invalid exit can be challenged:

* When Alice starts an exit she must put up an exit bond and wait for the challenge period for the exit to be finalized.

* Meanwhile, the Watchers report that Alice is attempting to exit tokens that she has already spent.

* Anyone can now challenge Alice’s exit by proving that Alice has already spent the UTXO in a transaction.

* If the challenge is successful, Alice does not exit the tokens and the challenger is awarded the exit bond that Alice put up.

## Exit types
There are two types of MoreVP exits:

* Standard
* In-flight

### Standard exit

A standard exit an be performed by a user who has access to contents of a valid block where their transaction has been included.

### In-flight exit

MoreVP introduced in-flight exits, which allow you to exit an in-flight transaction.

A transaction is considered in-flight in these scenarios:

* Transaction has been broadcast but has not yet been included in the child chain, or the user does not have access to the block in which the transaction is included; or,
* User has access to the block, but the block is invalid (due to a dishonest operator).

In-flight exits provide additional protection when something goes wrong on the child chain while you have transactions in-flight. For example, if a dishonest operator withholds blocks.








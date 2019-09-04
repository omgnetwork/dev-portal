---
id: the-plasma-lifecycle
title: The Plasma lifecycle
---

## Overview

Plasma is a framework for scalable decentralized applications, conceived by Lightning Network creator Joseph Poon and Ethereum creator Vitalik Buterin. This page provides a basic overview. See the full whitepaper at http://plasma.io/.


## Scalability with Plasma
OmiseGO is built as a scaling solution for decentralized finance on Ethereum, using Plasma architecture. 

Plasma structures blockchain computation into MapReduce functions and uses a combination of proof-of-stake (PoS) token bonding, fraud proofs to reduce the costs of computation, a withdrawal design to efficiently counter network attacks, and the network security provided by Ethereum as the root chain to safely enable unprecedented transaction and on-chain exchange processing speed and scale. 

This is achieved by allowing many child chains to run on top of the main blockchain, each interacting with the root chain with its own customized set of smart contracts. Computation happens primarily within these child chains, and only state proofs (tiny data packets, essentially snapshots of the balances within the child chain) are committed to and enforced by the root chain. This means that transactions can be processed instantly off-chain, but are ultimately stored on and enforced by the Ethereum root chain. 

![Plasma basics](assets/plasma-basics.png)

As an ultimate safeguard, Plasma also employs an exit mechanism, which allows account holders who identify suspicious behavior within a child chain to withdraw to the root chain, reverting all accounts on the child chain to the last root chain-finalized state. For more on OmiseGO's implementation of Plasma, see Introduction to Plasma (MoreVP)
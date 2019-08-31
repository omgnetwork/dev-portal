---
id: morevp-technical-overview
title: MoreVP Technical Overview
---

## Overview
This page provides a technical description of More Viable Plasma (MoreVP).

[Minimal Viable Plasma](https://ethresear.ch/t/minimal-viable-plasma/426) (Plasma MVP) describes a simple specification for a UTXO-based Plasma chain.

More Viable Plasma (MoreVP) is a modification to the Plasma MVP exit protocol that removes the need for a second signature, and generally improves user experience.

> *This article is based on the original [More Viable Plasma post](https://ethresear.ch/t/more-viable-plasma/2160/49) on ethresearch.*

## Introduction

A key component of the Plasma MVP design is a protocol for exits, whereby a user may withdraw back to the root chain any funds available to them on the Plasma chain.

The protocol presented in the MVP specification requires that users sign two signatures for every transaction. Concerns over the poor user experience presented by this requirement motivated the search for an alternative exit protocol.

This article describes More Viable Plasma (MoreVP), a modification to the Plasma MVP exit protocol that removes the need for a second signature, and generally improves user experience.

The MoreVP exit protocol ensures the security of assets for clients correctly following the protocol.

This guide:

* Presents the most basic form of the MoreVP protocol and provides insights towards its correctness.
* Formalizes certain [requirements for Plasma MVP exit protocols](doc:requirements-and-proof-for-plasma-mvp-exit-protocols), and provides proof that this protocol satisfies these requirements.
* Presents an optimized version of the protocol to account for restrictions of the Ethereum Virtual Machine.
* Explains how the MoreVP exit protocol is only necessary for transactions that are in-flight when a Plasma chain becomes byzantine.
* Describes the [attack vectors](doc:attack-vectors-and-mitigation) that exist in the protocol, and how these vectors can be mitigated and isolated to a relatively small attack surface.
* Concludes that the design is safe under certain reasonable assumptions about user behavior. However, some points are highlighted for future consideration.

It has been found that the MoreVP exit protocol is a significant improvement over the original Plasma MVP exit protocol. Additionally, it is possible to combine several optimizations to enhance user experience and to reduce costs for users.

Future development work will focus on decreasing the implementation complexity of th design, and to minimize contract gas usage.

## Basic Exit Mechanism
This section describes the basic MoreVP exit mechanism and provides insights toward its correctness.

> *Further technical details for the protocol can be found in [Protocol Terminology](doc:protocol-terminology).*

### Requirements for the Exit Mechanism

The MoreVP exit protocol allows the owners of both inputs and outputs to transactions to attempt an exit.

OmiseGO intends to design a mechanism that allows withdrawal of inputs and outputs under the following conditions:

**The owner of an input `in` to a transaction `tx` must prove that:**

1. *tx* is exitable.
2. *tx* is non-canonical.
3. *in* is not spent in any transaction other than *tx*.


**The owner of an output out to a transaction tx must prove that:**

1. *tx* is exitable.
2. *tx* is canonical.
3. *out* is not spent.

Since a transaction either is or is not canonical, only the transaction's inputs or outputs, and not both, may exit.

### Priority

The above game correctly selects the inputs or outputs that are eligible to exit. However, invalid transactions can still be exitable. For this reason, it's necessary to enforce an ordering on exits to ensure that all outputs created by valid transactions will be paid out before any output created by an invalid transaction. To do this, we order every exit by the position of the youngest input to the transaction referenced in each exit, regardless of whether an input or an output is being exited.

## Exit Protocol Specification

This section presents a more detailed specification for the exit protocol.

The MoreVP mechanism is designed to be deployed to Ethereum and, as a result, some particulars of this specification take into account limitations of the EVM.

The basic exit mechanism described above guarantees that honest users will always be able to withdraw any funds they hold on the Plasma chain.
However, we avoided describing how users actually prove the statements they’re required to prove.

The MoreVP exit protocol is not required in all scenarios. We can use the Plasma MVP exit protocol without confirmation signatures for any transaction included before an invalid (or, in the case of withheld blocks, potentially invalid) transaction. Thus, we only need to make use of the MoreVP protocol for the set transactions that are in-flight when a Plasma chain becomes byzantine.

The MoreVP protocol guarantees that if transaction is exitable, then either the unspent inputs or unspent outputs can be withdrawn, depending on whether the transaction is canonical.
However, in a scenario in which MoreVP exits are required, users may not be aware that an in-flight transaction is actually non-canonical. This can occur when the owner of an input to an in-flight transaction is malicious, and has signed a second transaction spending the same input.

To account for this problem, we allow exits to be ambiguous about canonicity.
Users can start MoreVP exits with the assumption that the referenced transaction is canonical. Other owners of inputs or outputs to the transaction can then “piggyback" the exit.
We add cryptoeconomic mechanisms that determine whether the transaction is canonical, and which of the inputs or outputs are unspent. This allows the correct determination of which inputs or outputs should be paid out.


### Time period for exit

The MoreVP exit protocol uses a challenge-response mechanism, which allows users to submit a challenge subject to a response that may invalidate the challenge. The exit process is split into two periods, which gives users enough time to respond to a challenge.

**When challenges require a response ...**

* Challenges must be be submitted before the end of the first exit period; and,
* Responses must be submitted before the end of the second exit period.


Each period must have a length of half the minimum finalization period (MFP). Currently, MFP is set to 7 days, so each period has a length of 3.5 days.

Watchers must validate the chain at least once every period (MFP/2).

### Start the exit

Any user may initiate an exit:

1. Present a spend transaction.
2. Prove that the transaction is exitable.
3. User submits an exit bond to start the action.
4. Later, the exit bond is used to cover the cost for other users to publish statements about the canonicity of the transaction in question.


### How to prove that a spend transaction is exitable?

Several mechanisms exist to prove that a spend transaction is exitable. This section describes two methods, starting with the method OmiseGO has implemented.

1.  


---
id: blockchain-design
title: Blockchain Design
sidebar_label: Blockchain Design
---


## Overview
This page describes the blockchain (consensus) design used by the first iteration of OmiseGO Plasma-based implementation. This design is a modified version of [Minimal Viable Plasma design](https://ethresear.ch/t/minimal-viable-plasma/426).

> This content assumes that you have prior knowledge of Ethereum and general familiarity with Plasma.



### Tesuji Plasma architecture
Tesuji Plasma's architecture allows cheaper transactions and higher throughput, without sacrificing security. Users make transactions on a child chain that derives its security from a root chain. 

Child chain refers to a blockchain that coalesces multiple transactions into a child chain block, compacting them into a single, cheap transaction on a root chain. OmiseGO's root chain is the Ethereum blockchain.




### About OmiseGO's blockchain design
The key features of OmiseGO's blockchain design may be viewed as deviations from the big picture Plasma that is outlined by the original Plasma paper:

1. Only supports transactions transferring value between addresses.

   Value transfer can take the form of an atomic swap; that is two currencies being exchanged in a single transaction (multiple currencies: Eth + ERC20).
   See also: Transactions

2. It is a non-p2p, proof-of-authority network. 

   The child chain is centrally controlled by a designated, fixed Ethereum address (the ChildChain operator); other participants (that is, users) connect to the ChildChain server.
   See also: Child chain server

3. Employs a single-tiered Plasma construction. That is, the child chain doesn't serve as a parent of any chain.

4. Does not allow cheap, coordinated mass exits. 


### Security and scaleability
Security and scaleability is built in to the design, with the following features: 

1. Deposit funds into a contract on the root chain.
2. Make inexpensive, multiple transfers of funds deposited on the child chain.
3. Exit any funds held on the child chain, and securely reclaim them on the root chain.
4. Every exit of funds held on the child chain must come with proof that the exit is justified. The following sections clarify the nature of such proof (that is, an attestation, or evidence justifying the exit).

#### Proving a justified exit
Exits are allowed regardless of the state of the PoA child chain. Thus, funds held on the child chain and on the root chain may be treated as equivalent, provided that, if anything goes wrong on the child chain, everyone must exit to the root chain.

Plasma architecture presumes root chain availability.  

## Components

The following components drive consensus: 
* Root chain contract
* Child chain server
* Watcher

### Root chain contract	
The root chain contract secures the child chain:

* Holds funds deposited by other addresses (users)
* Tracks ChildChain block hashes submitted that account for the funds being moved on the ChildChain
* Manages secure exiting of funds, including exits of in-flight transactions

### Child chain server	
The child chain server creates and submits blocks:

* Collects valid transactions that move funds on the child chain
* Submits ChildChain block hashes to the RootChain contract
* Publishes contents of ChildChain blocks

### Watcher	
Validates the child chain, ensuring the child chain consensus mechanism is working properly:

* Tracks the root chain contract, published blocks and transactions
* Reports any breach of consensus
* As an additional service, collects and stores the account information required to use the child chain.
* As an additional service, provides a convenience API to access the child chain API and Ethereum. 
* Protects user by restricting access only to those times the child chain is valid

All cryptographic primitives used (signatures, hashes) are understood to be ones compatible with whatever EVM uses.



## RootChain contract
The child chain, and the root chain contract that secures it, manage funds using the UTXO model. See Transactions.

### Deposits
Any Ethereum address may deposit ETH or ERC20 tokens into the root chain contract. Deposits increase the pool of funds held by the root chain contract, and also signals to the child chain server that the funds should be accessible on the child chain.

Deposited funds are recognized as a single UTXO on the child chain. The UTXO can then be spent on the child chain (provided that the child chain server follows consensus), or it can be exited immediately on the root chain (regardless of whether child chain server follows consensus).

Depositing involves forming a pseudo-block of the child chain. The pseudo block contains a single transaction, with the deposited funds as a new UTXO.


### Exits w/ exit challenges
Exits are the most important part of the root chain contract facilities. Exits provide the equivalence of funds sitting in the child chain vs funds on the root chain.

Exits must satisfy the following conditions:
| Condition | Description |
| ---       |   ---       |
| E1        | Only funds represented by UTXOs that were provably included in the ChildChain may be exited. See Transactions. This means that only funds that provably existed may be exited. |
| E2        | Attempts to exit funds that have been provably spent on the child chain, must be thwarted and punished. |
| E3        | There must be a priority given to earlier UTXOs, for the event when the attacking ChildChain operator submits a block creating UTXOs dishonestly and attempts to exit these UTXOs. This allows all UTXOs created before the dishonest UTXOs, to exit first. |
| E4        | In-flight funds (funds locked up in a transaction), which may or may not have not been included in the ChildChain, must be able to exit on par with funds whose inclusion is known. |




#### Submitting exit requests and challenging

The following mechanisms satisfy conditions E1 and E2, depending on the inclusion:
* Regular exit
* In-flight exit

##### Regular exit
May be used by UTXOs that have the transaction that created them included in a known position, in a ChildChain that is valid up to that point.

Any Ethereum address that can prove possession of funds (UTXO) on the ChildChain can submit a request to exit.

Proof involves showing the transaction that contains the UTXO as output, and proving that the transaction is included in one of the submitted ChildChain blocks.

However, additional attestation is required to allow withdrawal of funds from the RootChain contract; the submitted (proven) exit request must still withstand achallenge period,when it can be challenged by anyone who can provide evidence that the exited UTXO has been spent.

Evidence consists of a signed transaction, showing the spending of the exiting UTXO, regardless of its inclusion.

An exit challenge period counts from the exit request submission, until this exit's scheduled finalization time.

A successful and timely exit challenge invalidates the exit.



##### In-flight exit

May be used by in-flight funds; that is, where the inclusion of the transaction manipulating such funds is not known, or they're included in an invalid chain.

Assuming that the in-flight transaction has inputs that had been outputs of a transaction included in a valid chain, such funds can be recovered using the MoreVP protocol.



#### Finalizing exits at Scheduled Finalization Time (SFT)
Finalizing an exit means releasing funds from the root chain contract to the exitor. Exits finalize at their Scheduled finalization time (SFT).

Exit scheduling and priorities satisfy condition E3.

The table describes scheduled finalization time (SFT) for different types of exits: 

| Exit type | Scheduled finalization time (SFT) |
|   ---     |   ---     |
| Regular exits | SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP + REP) |
| In-flight exits   | exitable_at = max(exit_request_block.timestamp + MFP, youngest_input_block.timestamp + MFP + REP) |
| Deposits  |   The exit priority for deposits is elevated to protect against malicious operators:   SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP) |

See MoreVP protocol for more information.

***

##### Configuration parameters for Scheduled Finalization Time (SFT)
The table describes the configuration parameters for Scheduled Finalization Time (SFT): 

exit_request_block	The RootChain block where the exit request is mined.
utxo_submission_block	The RootChain block where the exiting UTXO was created in a ChildChain block.
youngest_input_block

The RootChain block where the youngest input of the exiting transaction was created.

##### Exit waiting period
All exits must wait at least the Minimum Finalization Period (MFP), to always have the challenge period. 

Freshly exited UTXOs must wait an additional Required Exit Period (REP), counting from their submission to the RootChain contract. 

Example values for these exit waiting periods, as in Minimal Viable Plasma:

MFP - 1 week

REP - 1 week

##### Exit priority
RootChain contract allows finalizing exits after their Scheduled Finalization Time (SFT) had passed. In this case, exits are processed in ascending order of exit priority:

Exit priority has two keys:

Primary key	The SFT (scheduled finalization time)
Secondary key	
The UTXO position

See also: Transaction



#### ChildChain validation frequency
There are maximum periods of time a user can spend offline without validating a particular aspect of the chain and exposing themselves to risk of fund loss. 

User must validate with the following frequency:

Validate the ChildChain	
Every REP

To ensure you have enough time to submit an exit request in case chain invalid.
Validate exits

Every MFP	To challenge invalid regular exits.
Validate in-flight exits	Every MFP/2	To challenge invalid actions in the in-flight exit protocol.
To cover all possible misbehaviors that may occur in the network, user must validate at rarest every min(REP, MFP/2).



#### Example exit scenario
Scenario:  MFP = 1 day, REP = 2 day

The table illustrates the relation between MFP and REP in the scenario:  

Day 1	
Operator creates, includes, and starts to exit an invalid UTXO

Day 3	
User has been offline for two days.

User checks chain (REP) and sees the invalid transaction.

User exits his old UTXO

Day 4	
Both operator and user can exit (after MFP), but user's exit takes precedence based on utxoPos

### Block submissions
Only a designated address that belongs to the ChildChain operator may submit blocks.

Every block submitted to the RootChain contract compacts multiple ChildChain transactions. Effectively, the block being submitted means that during exiting, ownership of funds (inclusion of transaction) can be now proven using a new ChildChain block hash.



### Network congestion
The ChildChain allows a maximum of N UTXOs at given time on the ChildChain.

N is bound by RootChain's bandwidth limitations and is the maximum amount of UTXOs that can safely request to exit, if the ChildChain becomes invalid.

Plasma assumes RootChain network and block gas availability to start all users' exits in time. If network congestion occurs, time is frozen on the RootChain contract until is becomes safe to operate again. 

Important!

Full implementation of this feature is reserved for further research and development. 



### Reorgs
Reorg refers to changing the order of blocks and transactions on the RootChain. Reorgs can lead to spurious invalidity of the ChildChain. For instance, without any protection, a deposit can be placed and then spent quickly on the ChildChain.

Everything is valid, if the submit block RootChain transaction gets mined after the deposit (causing the honest ChildChain to allow the spend). However, if the order of these transactions gets reversed due to a reorg, the spend will appear before the deposit, rendering the ChildChain invalid.

OmiseGO blockchain employs these mechanisms to protect itself against reorgs: 

Only allow deposits to be used on the ChildChain N Ethereum Block confirmations.
This allows you to make it expensive for miners who want to try invalidating the ChildChain.
The rule is built in to the ChildChain. The RootChain contract won't enforce this in any way.

Account nonce mechanism protects the submission of blocks to the RootChain contract.
Miners attempting to mine blocks in the wrong order would produce incorrect Ethereum block.

ChildChain blocks are numbered independently from the numbering of deposit blocks.
A deposit block that disappears won't invalidate the numbering of the ChildChain blocks.


## ChildChain server
### Collecting transactions
The ChildChain server collects transactions, and immediately executes valid transactions.

The ChildChain has a transactions per block limit; that is, an upper limit for the number of transactions that can go in a single ChildChain block.
A submitted transaction that exceeds th elimit is queued, and scheduled for inclusion in the next block. The queue is prioritized by transaction fee value. When there are too many transactions in the queue, transactions with the lowest fees are lost, and must be resubmitted.

Transaction per block limit is assumed to be 2^16, per Minimal Viable Plasma




### Submitting and propagating blocks
The ChildChain server submits blocks to the RootChain contract.

Every T amount of time, the ChildChain submits a block (in the form of blocks' transactions merkle root hash) to the RootChain contract, and shares the block's content with the Watcher. Watcher receives the block, and extracts required information. 

If the ChildChain operator withholds a submitted block or if it submits an invalid block - that is, it doesn't share the block contents; then, everyone must exit.

### Transaction content
A transaction involves spending existing UTXO(s) (inputs), and creating new UTXO(s) (outputs).

A transaction typically specifies the following:

input sent
output owner
sender's amount (owner of the input)
recipient's amount (owner of the output)
A transaction must include the spender's signature, which is proof the sender consents to their funds (input) being spent. 

Each transaction can have up to 4 UTXOs as inputs, and it can create up to 4 UTXOs as outputs.

The ChildChain operator is eligible to claim a transaction fee (the surplus of the amount being input over the amount being output), which is stated as follows: 

(sumAmount(spent UTXOs) - sumAmount(created UTXOs) >= 0) is the fee that the ChildChain operator is eligible to claim later.



ChildChain will have the following:

    [
      [sig1, sig2, sig3, sig4],
      [inpPos1, inpPos2, inpPos3, inpPos4],
      [
        [newOwner1, currency1, amount1],
        [newOwner2, currency2, amount2],
        [newOwner3, currency3, amount3],
        [newOwner4, currency4, amount4]
      ],
      metadata
    ]
inpPos	
Defines input to the transaction. Every inpPos is an output's unique position, derived from:

Child block number
Transaction index within the block
Output index
The transaction is valid only when every output for the transaction is unspent.

Value may be zero, when less than 4 inputs are required.

sig	
Signature of all other fields in a transaction; RLP-encoded, and hashed.

A transaction must have a non-zero signature per every non-zero input used, under the same indices. Any zero input must have a zero signature (65 zero bytes) delivered.

newOwner, currency, and amount	A single output, specifying the address of the new owner, for a specified amount of currency.
metadata	Optional. Maximum data limit is 32bytes. Requires zero logic, and is included only in the transaction hashes preimage. 
To exclude this field, simply skip it in the array.
All zero outputs, inputs must come after the non-zero ones.

To create a valid transaction you must have access to the positions of all the UTXOs that you own.

### Fees
#### ChildChain server fees
A minimum fee is configured for the ChildChain server. Minimum fee is derived from the average of N different APIs. The central server is pinged so that fees are updated for current pricing. Further details may be found at https://developer.makerdao.com/feeds/

Transactions below the defined minimum fee are rejected. 

#### Tracking and exiting fees
The ChildChain operator is eligible to exit the fees accumulated from the RootChain contract. The Watcher participates to track the correctness of fee exits.

## Watcher
The Watcher is assumed to be run by the users. Users on the ChildChain must be able to trust the Watcher. 

The proper functioning of the Watcher is critical to keeping deposited funds secure.



### Watcher's role
Watcher's role is as follows:

Watcher pings the ChildChain server to ensure everything is valid.
Watcher monitors the RootChain contract for a lockSubmitted event log (a submission of a ChildChain block).
When the Watcher receives a log, it pings the ChildChain for the full block.
Watcher verifies that the block is valid, and that its root matches the ChildChain root that was submitted.


### Invalid chain and funds exit
The Watcher monitors for conditions that would signal an invalid chain.

Any of these conditions makes the Watcher prompt for an exit of funds:

Invalid blocks	
The following may signal invalid blocks:

Transactions spending an input spent in any prior block
Transactions spending exited inputs, if unchallenged or challenge failed or was too late
Transactions with deposits that haven't happened.
Transactions with invalid inputs.
Transactions with invalid signatures.
Operator exits more fees than they're due	
The Watcher must ensure that the operator never exits more fees than they're due, because funds covering exited fees come from the same pool as deposited funds. So if the ChildChain operator exits too much in fees, there may not be enough funds left in the RootChain contract for the exit.



Unable to validate a submitted ChildChain block	The Watcher needs information to validate a ChildChain block that's been submitted to the RootChain. If it can't acquire the information or it takes too long to get this information, this will trigger a funds exit prompt.


The Watcher checks for the following conditions that will optionally prompt for an exit challenge:

Exits during their challenge period referencing UTXOs that have already been spent on the child chain.
Invalid actions taken during the in-flight exit game, see MoreVP protocol.
As soon as one Watcher detects the ChildChain to be invalid, all others will as well and everyone with assets on the ChildChain is notified to exit immediately.

### Watcher storage facilities
The storage facilities of the Watcher is also known as Account Information.

Watcher takes on an additional responsibility: collecting and storing data relevant to secure handling of user's assets on the child chain:

UTXOs in possession of the address holding assets
Full transaction history (child chain blocks)

## Exchange
For a high-level discussion about exchange designs on top of Tesuji plasma, see OmiseGO Decentralized Exchange (ODEX)



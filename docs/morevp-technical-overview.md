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


### How to prove that a spend transaction is exitable

Several mechanisms exist to prove that a spend transaction is exitable. This section describes two methods, starting with the method OmiseGO has implemented.

**Implemented exit proof method**
1. User presents `tx` along with each of the `input_tx1, input_tx2, ... , input_txn` that created the inputs to the transaction, a Merkle proof of inclusion for each `input_tx`, and a signature over `tx` from the `newowner` of each `input_tx`.

2. The contract validates the following:
    * Transactions are correct
    * Transactions are included in the chain
    * Signatures are correct
    * Exiting transaction is correctly formed

This proves the exitability of the transaction.

*Key features of this method:*
This method was selected for implementation.

* The transaction is verified as exitable when the exit is started.
* Only a single exit on any given transaction can exist at any point in time.
* Lower communication cost and complexity
* Higher up-front gas cost.

**Alternative exit proof method**

1. User presents the transaction, along with signatures claimed as valid.
2. The contract validates that the exiting transaction is correctly formed.
3. Another user can challenge one of these signatures by presenting some transaction that created an input 
such that the true input owner did not sign the signature. The exit is blocked entirely and the challenging 
user receives `exit bond`.

*Key features of this method:*
* Allows a user to claim that a transaction is exitable, but leaves the proof to a challenge-response game.
* Must permit multiple exits on the same transaction because some exits may provide invalid signatures.
* Cheaper up-front
* Adds complexity

> Other methods exist to prove a transaction is exitable. And there may be further ways to optimize the two methods described here. Further research is required to provide a deterministic ordering of exits by some priority. MoreVP exits are assigned priority based on the position in the Plasma chain of the most recently included (newest) input to that transaction. Unlike the MVP protocol, each input and output to a transaction is assigned the same priority.
This should be implemented by inserting a single “exit” object into a priority queue of exits and tracking a list of inputs or outputs to be paid out once the exit is processed.


### Proving canonicity
The canonicity of the referenced transaction (independent of any piggybacking by other users), determines whether unspent inputs or unspent outputs are paid out in an exit.

Proving a transaction canonical is expensive. Thus, by default, we assume the referenced transaction is canonical, and allow a series of challenges and responses to determine the true canonicity of the transaction.

Determining canonicity involves a challenge-response game:

* In the first period of the exit, any user may reveal a competing transaction that potentially makes the exiting transaction non-canonical.
* The competing transaction must be exitable and must share an input with the exiting transaction, but does not have to be included in the Plasma chain.
* Multiple competing transactions can be revealed during this period, but only the oldest presented transaction is considered for the purposes of a response.
* If any transactions are presented during the first period, any other user can respond to the challenge by proving that the exiting transaction is actually included in the chain before the oldest presented competing transaction.
* If the response is sent before the second period ends, the exiting transaction is considered canonical, and the responder receives the `exit bond` that was placed by the user who started the exit. Otherwise, the exiting transaction is considered non-canonical, and the challenger receives `exit bond`.

> This challenge means it’s possible for an honest user to lose the `exit bond` if they're not aware their transaction is non-canonical. See also: Attack vectors and mitigation. If an in-flight exit is opened where some inputs were referenced in a standard exit, and these standard exits were finalized, the in-flight exit is flagged as non-canonical and further canonicity games can't change its status.


### Piggyback an exit

Some participants in a transaction may not be aware that the transaction is non-canonical. Owners of both inputs and outputs to a transaction may want to start an exit in order to receive the funds from the exit.

To void the gas cost of repeatedly publishing and proving statements about the same transaction, owners of inputs or outputs to a transaction are allowed to piggyback an existing exit that references the transaction.


> Important! You must piggyback an exit within the first period. While piggybacking an exit is not mandatory, users who choose not to piggyback an exit are choosing not to attempt a withdrawal of their funds. If the chain is byzantine and you don't piggyback, you could potentially lose your funds.

**Perform these steps to piggyback an exit:**

1. Input or output owner places a 'piggyback' bond, which covers the cost of challenges that show the input or output is spent.
2. A successful challenge blocks the specified input or output from exiting.
3. Challenges must be presented before the end of the second period.

### Process an exit

An exit can be processed after the second period:

* If the referenced transaction is considered canonical, all remaining unchallenged piggybacked outputs are paid out.
* If the referenced transaction is considered non-canonical, all remaining unchallenged piggybacked inputs are paid out.

Any paid out inputs or outputs should be saved in the contract so that any future exit referencing the same inputs or outputs may be challenged.

## Combining MoreVP and Plasma MVP protocols

The MoreVP protocol can be combined with the Plasma MVP exit protocol in a way that simultaneously preserves the integrity of exits and minimizes gas cost.

Although the two protocols determine exit priority differently, total ordering on exits is still required. Thus, regardless of the protocol used, every exit must be included in the same priority queue for processing.

An honest user that enjoys data availability should be able to ignore in-flight exits that involve their outputs.
Output owners on the Plasma chain should be able to start an exit via either mechanism, but not both.

There are two approaches for ensuring that money can't be double-spent via the two protocols:
1. Implemented solution:

    Two checks are performed, provided both types of exits use transaction hash as an exit ID:

    * Contract verifies if other types of exits exist for particular output when standard exit is submitted. In this case, the new exit is blocked.

    * When an in-flight exit is added, contract verifies whether standard exit is either in progress or finalized. In this case, the in-flight exit is marked as one that can be exited only from inputs, and problematic inputs are marked as spent for piggybacking purposes.

    The coexistence of MVP and MoreVP protocols do not give rise to any additional interactive games.

2. Alternative solution (reserved for future development)

    * Introduce new types of challenges to reduce gas costs for honest participants.
    * Piggybacks on outputs should be challenged by standard exits and vice-versa.
    * Standard exits on UTXO seen as the input of an in-flight tx exit can be challenged using tx body.
    * Canonicity of in-flight exit can be removed by pointing contract to finalized standard exit from in-flight exit inputs, marking particular input as spent.

> More information may be found in [Standard vs In-flight Exists Interaction](https://github.com/omisego/elixir-omg/blob/master/docs/standard_vs_in_flight_exits_interaction.md)

## Alice-Bob Scenarios

### Alice & Bob are honest and cooperating
1. Alice spends `UTXO1` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is in-flight.
3. Operator begins withholding blocks while `TX1` is still in-flight.
   Neither Alice nor Bob know if the transaction has been included in a block.
4. Someone with access to `TX1` (Alice, Bob, or otherwise) starts an exit referencing         `TX1` and places `exit bond`.
5. Bob piggybacks onto the exit and places `piggyback bond`.
6. Alice is honest, so she hasn’t spent `UTXO1` in any transaction other than `TX1`.
7. After period 2, Bob receives the value of `UTXO2`. 
8. All bonds are refunded.

### Mallory tries to exit a spent output
1. Alice spends `UTXO1` in `TX1` to Mallory, creating `UTXO2`.
2. `TX1` is included in block `N`.
3. Mallory spends `UTXO2` in `TX2`.
4. Mallory starts an exit referencing `TX1` and places `exit bond`.
5. Mallory piggybacks onto the exit and places `piggyback bond`.
6. In period 2, someone reveals `TX2` spending `UTXO2`.
   This challenger receives Mallory’s `piggyback bond`.
7. Alice is honest, so she hasn’t spent `UTXO1` in any transaction other than `TX1`.
8. After period 2, Mallory’s `exit bond` is refunded, no one exits any UTXOs.

### Mallory double-spends her input
1. Mallory spends `UTXO1` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is in-flight.
3. Operator begins withholding blocks while `TX1` is still in-flight.
   Neither Mallory nor Bob know whether the transaction has been included in a block.
4. Mallory spends `UTXO1` in `TX2`.
5. `TX2` is included in a withheld block.
   `TX1` is not included in a block.
6. Bob starts an exit referencing `TX1` and places `exit bond`.
7. Bob piggybacks onto the exit and places `piggyback bond`.
8. In period 1, someone challenges the canonicity of `TX1` by revealing `TX2`.
9. No one is able to respond to the challenge in period 2, so `TX1` is determined to be non-canonical.
10. After period 2, Bob’s `piggyback bond` is refunded, no one exits any UTXOs.
The challenger receives Bob’s `exit bond`.

### Mallory spends her input again later
1. Mallory spends `UTXO1` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is included in block `N`.
3. Mallory spends `UTXO1` in `TX2`.
4. `TX2` is included in block `N+M`.
5. Mallory starts an exit referencing `TX1` and places `exit bond`.
6. In period 1, someone challenges the canonicity of `TX1` by revealing `TX2`.
7. In period 2, someone responds to the challenge by proving that `TX1` was included before `TX2`.
8. After period 2, the user who responded to the challenge receives Mallory’s `exit bond`, no one exits any UTXOs.

### Mallory attempts to exit a spent input
1. Mallory spends `UTXO1` and `UTXO2` in `TX1`.
2. Mallory spends `UTXO1` in `TX2`.
3. `TX1` and `TX2` are in-flight.
4. Mallory starts an exit referencing `TX1` and places `exit bond`.
5. Mallory starts an exit referencing `TX2` and places `exit bond`.
6. In period 1 of the exit for `TX1`, someone challenges the canonicity of `TX1` by revealing `TX2`.
7. In period 1 of the exit for `TX2`, someone challenges the canonicity of `TX2` by revealing `TX1`.
8. After period 2 of the exit for `TX1`, the challenger receives `exit bond`, no one exits any UTXOs.
9. After period 2 of the exit for `TX2`, the challenger receives `exit bond`, no one exits any UTXOs.

### Operator attempts to steal funds from an included transaction
1. Alice spends `UTXO1` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is included in (valid) block `N`.
3. Operator creates invalid <<glossary:deposit>>, creating `UTXO3`.
4. Operator spends `UTXO3` in `TX3`, creating `UTXO4`.
5. Operator starts an exit referencing `TX3` and places `exit bond`.
6. Operator piggybacks onto the exit and places `piggyback bond`.
7. Bob starts a *standard* exit for `UTXO2`.
8. Operator’s exit will have priority of position of `UTXO3`.
Bob’s exit will have priority of position of `UTXO2`.
9. Bob receives the value of `UTXO2` first, Operator receives the value of `UTXO4` second (ideally contract is empty by this point).
All bonds are refunded.

### Operator attempts to steal funds from an in-flight transaction
1. Alice spends `UTXO1` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is in-flight.
3. Operator creates invalid <<glossary:deposit>>, creating `UTXO3`.
4. Operator spends `UTXO3` in `TX3`, creating `UTXO4`.
5. Operator starts an exit referencing `TX3` and places `exit bond`.
6. Operator piggybacks onto the exit and places `piggyback bond`.
7. Bob starts an exit referencing `TX1` and places `exit bond`.
8. Bob piggybacks onto the exit and places `piggyback bond`.
9. Alice is honest, so she hasn’t spent `UTXO1` in any transaction other than `TX1`.
10. Operator’s exit will have priority of position of `UTXO3`.
Bob’s exit will have priority of position of `UTXO1`.
11. Bob receives the value of `UTXO2` first, Operator receives the value of `UTXO4` second (ideally contract is empty by this point).
All bonds are refunded.

### Operator attempts to steal funds from a multi-input, in-flight transaction
1. Alice spends `UTXO1a`, Malory spends `UTXO1m` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is in-flight.
3. Operator creates invalid <<glossary:deposit>>, creating `UTXO3`.
4. Operator spends `UTXO3` in `TX3`, creating `UTXO4`.
5. Operator starts an exit referencing `TX3` and places `exit bond`.
6. Operator piggybacks onto the exit and places `piggyback bond`
7. Malory starts an exit referencing `TX1` and places `exit bond`.
8. Bob piggybacks onto the exit and places `piggyback bond`.
9. Alice piggybacks onto the exit and places `piggyback bond`.
9. Mallory double-spends `UTXO1m` in `TX2` and broadcasts.
9. Operator includes `TX2` and submits as a competitor to `TX1` rendering it non-canonical
10. Operator's exit of `TX3` will have priority of position of `UTXO3`.
Alice-Mallory exit will have priority of position of `UTXO1`.
11. Alice receives the value of `UTXO1a` first, Operator receives the value of `UTXO4` second (ideally contract is empty by this point).
Bob receives nothing.
Mallory's `exit bond` goes to the Operator.
Mallory's `TX2` is canonical and owners of outputs can attempt to exit them.

### Honest receiver should not start in-flight exits
An honest user obtaining knowledge about an in-flight transaction **crediting** them **should not** start an exit, otherwise risks having their exit bond slashed.

The out-of-band process in such event should always put the burden of starting in-flight exits **on the sender**.

The following scenario demonstrates an attack that is **possible if receivers are too eager to start in-flight exits**:
1. Mallory spends `UTXO1` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is in-flight.
3. Operator begins withholding blocks while `TX1` is still in-flight.
4. Bob **eaglerly** starts an exit referencing `TX1` and places `exit bond`.
5. Mallory spends `UTXO1` in `TX2`.
6. In period 1 of the exit for `TX1`, Mallory challenges the canonicity of `TX1` by revealing `TX2`.
7. No one is able to respond to the challenge in period 2, so `TX1` is determined to be non-canonical.
8. After period 2, Mallory receives Bob’s `exit bond`, no one exits any UTXOs.

Mallory has therefore caused Bob to lose `exit bond`, even though Bob was acting honestly.


## Attack vectors

### Honest Exit Bond Slashing

It’s possible for an honest user to start an exit and have their exit bond slashed.
This can occur if one of the inputs to a transaction is malicious and signs a second transaction spending the same input.

The following scenario demonstrates this attack:
1. Mallory spends `UTXO1m` and Alice spends `UTXO1a` in `TX1` to Bob, creating `UTXO2`.
2. `TX1` is in-flight.
3. Operator begins withholding blocks while `TX1` is still in-flight.
4. Alice starts an exit referencing `TX1` and places `exit bond`.
4. Alice piggybacks onto the exit and places `piggyback bond`.
5. Mallory spends `UTXO1m` in `TX2`.
6. In period 1 of the exit for `TX1`, Mallory challenges the canonicity of `TX1` by revealing `TX2`.
7. No one is able to respond to the challenge in period 2, so `TX1` is determined to be non-canonical.
8. After period 2, Mallory receives Alice's `exit bond`, Alice receives `UTXO1a` and `piggyback bond`.

Mallory has therefore caused Alice to lose `exit bond`, even though Alice was acting honestly.
We want to mitigate the impact of this attack as much as possible so that this does not prevent users from receiving funds.

> In the scenarios where Mallory double-spends her input, she doesn't get to successfully piggyback, unless the operator includes and makes canonical her double-spending transaction. In this case, she may lose more than she's getting from stolen `exit bonds`.


### Honest transaction retries attack
Under MoreVP, it is not safe to retry a transaction that has failed for a trivial reason.

Consider the following scenario:
1. Honest Alice creates/signs/submits a transaction `tx1`
2. This fails, either loudly (error response from child chain server) or quietly (no response) - `tx1` doesn't get included in a block
3. Alice is forced to in-flight exit, even if she just made a trivial mistake (e.g. incorrect fee)
4. If instead Alice retries with amended `tx2`, then she opens an attack on her funds:
- if the child chain is good, `tx2` is included in a valid, non-withheld block, and all is well
- if the child chain goes rogue, Alice is left defenseless, because she double-spent her input, i.e. she can no longer in-flight exit `tx1` or `tx2`

> See section [Timeouts](#Timeouts) for details about one more possible mitigation. However, due to uncertainty of timeouts in MoreVP, other mitigations for the retry problem might be necessary.

## Mitigations for honest exit bond slashing
This section describes the mitigations against Honest Exit Bond Slashing.

### Bond sharing
One way to partially mitigate this attack is for each user who piggybacks to cover some portion of `exit bond`.
This cuts the per-person value of `exit bond` proportionally to the number of users who have piggybacked.
Note that this is a stronger mitigation the more users are piggybacking on the exit and would not have any impact if only a single user starts the exit/piggybacks.

### Small Exit Bond
The result of the above attack is that users may not exit from an in-flight transaction if the gas cost of exiting plus the value of `exit bond` is greater than the value of their input or output.
We can reduce the impact of this attack by minimizing the gas cost of exiting and the value of `exit bond`.
Gas cost should be highly optimized in any case, so the value of `exit bond` is of more importance.

`Exit bond` is necessary to incentivize challenges.
However, we believe that challenges can be sufficiently incentivized if `exit bond` simply covers the gas cost of challenging.
Observations from the Bitcoin and Ethereum ecosystems suggest that sufficiently many nodes will verify transactions without a direct in-protocol incentive to do so.
Our system requires only a single node be properly incentivized to challenge, and it’s likely that many node operators will have strong external incentives.
Modeling the “correct” size of the exit bond is an ongoing area of research.

### Timeouts
Timeouts can be added to each transaction (must be included in the chain by block X) to:
- reduce number of transactions vulnerable to [**Honest Exit Bond Slashing**](#Honest-Exit-Bond-Slashing) point in time.
- alleviate [**Honest transaction retries attack**](#Honest-transaction-retries-attack), allowing Alice to just wait the timeout and retry
This will probably also be necessary from a user experience point of view, as we don’t want users to accidentally sign a double-spend simply because the first transaction hasn’t been processed yet.

Note: It is unconfirmed how the timeouts scheme would modify MoreVP and whether it's feasible at all.

## Requirements and proof

This section describes requirements and proof of the Plasma MVP exit protocol.

### Safety rule
The general rule for safety may be stated as follows: 
"If an output was exitable at some time and is not spent in a later transaction, then it must still be exitable".
Without this condition, it may be possible for a user to receive money but not be able to spend or exit from it later.

Technically, if we say that $E(T_{n})$ represents the set of exitable outputs for some Plasma chain and $T_{n+1}$ is $T_{n}$ plus some new transaction $t_{n+1}$:

    $$
    \forall o \in E(T_{n}) : o \not\in I(t_{n+1}) \implies o \in E(T_{n+1})
    $$

### Liveness rule
The liveness rule states that "if an output was exitable at some time and *is* spent later, then immediately after that spend, either it's still exitable or all of the spend's outputs are exitable, but not both".

The second part ensures that something is spent, then all the resulting outputs should be exitable.
The first case is special - if the spend is invalid, then the outputs should not be exitable and the input should still be exitable.

    $$
    \forall o \in E(T_{n}), o \in I(t_{n+1}) \implies o \in E(T_{n+1}) \oplus O(t_{n+1}) \subseteq E(T_{n+1})
    $$

### Basic Exit Protocol
#### Formalization
    $$
    E(T_{n}) = unspent(reality(T_{n})) \setminus double\_spent(T_{n})
    $$

#### Priority
Exits are ordered by a given priority number.
An exit with a lower priority number will process before an exit with a higher priority number.
We define the priority of an exit from a transaction $t$, $p(t)$, as:

    $$
    p(t) = \max(I(t))
    $$

### Proof of Requirements
#### Safety property
Our safety property says:

    $$
    \forall o \in E(T_{n}), o \not\in I(t_{n+1}) \implies o \in E(T_{n+1})
    $$

To prove this for our $E(T_{n})$, let's take some $o \in E(T_{n})$.

From our definition, $o$ must be in $unspent(reality(T_{n}))$, and must not be in $double\_spent(T_{n})$.

$o \not\in I(t_{n+1})$ means that $o$ will still be in $reality$, because only a transaction spending $o$ can impact its inclusion in $reality$.

Also, $o$ can't be spent (or double spent) if it wasn't used as an input.

So our function is safe!

#### Liveness property
Our liveness property states:

    $$
    \forall o \in E(T_{n}), o \in I(t_{n+1}) \implies o \in E(T_{n+1}) \oplus O(t_{n+1}) \subseteq E(T_{n+1})
    $$

However, *we do have a case for which liveness does not hold* - namely that if the second transaction is a non-canonical double spend, then both the input and all of the outputs will not be exitable.
This is a result of the $\setminus double\_spent(T_{n})$ clause.
We think this is fine, because it means that only double spent inputs are at risk of being "lost".

The updated property is therefore:
    $$
    \forall o \in E(T_{n}), o \in I(t_{n+1}) \implies o \in E(T_{n+1}) \oplus O(t_{n+1}) \subseteq E(T_{n+1}) \oplus o \in double\_spent(T_{n+1})
    $$

This is more annoying to prove, because we need to show each implication holds separately, but not together.
Basically, given $\forall o \in E(T_{n}), o \in I(t_{n+1})$, we need:

    $$
    o \in E(T_{n+1}) \implies O(t_{n+1}) \cap E(T_{n+1}) = \varnothing \wedge o \not\in double\_spent(T_{n+1})
    $$

and

    $$
    O(t_{n+1}) \subseteq E(T_{n+1}) \implies o \not\in E(T_{n+1}) \wedge o \not\in double\_spent(T_{n+1})
    $$

and

    $$
    o \in double\_spent(T_{n+1}) \implies O(t_{n+1}) \cap E(T_{n+1}) = \varnothing \wedge o \not\in E(T_{n+1})
    $$

Let's show the first.

$o \in I(t_{n+1})$ means $o$ was spent in $t_{n+1}$.
However, $o \in E(T_{n+1})$ means that it's unspent in any canonical transaction.
Therefore, $t_{n+1}$ cannot be a canonical transaction.
$O(t_{n+1}) \cap E(T_{n+1})$ is empty if $t_{n+1}$ is not canonical, so we've shown the half.

Our specification states that $o \in double\_spent(T_{n+1}) \implies o \not\in E(T_{n+1})$, so we can show the second half by looking at the contrapositive of that statement $o \in E(T_{n+1}) \implies o \not\in double\_spent(T_{n+1})$.

Next, we'll show the second statement.

$O(t_{n+1}) \subseteq E(T_{n+1})$ implies that $t_{n+1}$ is canonical.
If $t_{n+1}$ is canonical, and $o$ is an input to $t_{n+1}$, then $o$ is no longer unspent, and therefore $o \not\in E(T_{n+1})$.
If $t$ is canonical then there cannot exist another earlier spend of the input, so $o \not\in double\_spent(T_{n+1})$.

Now the third statement.

$o \in double\_spent(T_{n+1})$ means $t$ is necessarily not canonical, so we have $O(t_{n+1}) \cap E(T_{n+1}) = \varnothing$.
It also means that $o \not\in E(T_{n+1})$ because of our $\setminus double\_spent(T_{n})$ clause.

Finally, we'll show that at least one of these must be true.
Let's do a proof by contradiction.

Assume the following:

    $$
    O(t_{n+1}) \cap E(T_{n+1}) = \varnothing \wedge o \not\in E(T_{n+1}) \wedge o \not\in double\_spent(T_{n+1})
    $$

We've already shown that:

    $$
    o \in E(T_{n+1}) \implies O(t_{n+1}) \cap E(T_{n+1}) = \varnothing \wedge o \not\in double\_spent(T_{n+1})
    $$

We can negate this statement to find:

    $$
    o \not\in E(T_{n+1}) \wedge (O(t_{n+1}) \subseteq E(T_{n+1}) \vee o \in double\_spent(T_{n+1}))
    $$

However, we assumed that:

    $$

    O(t_{n+1}) \cap E(T_{n+1}) = \varnothing \wedge o \not\in double\_spent(T_{n+1})

    $$

Therefore we've shown the statement by contradiction.

#### Exit ordering
Let $t_{v}$ be some <<glossary:valid transaction>> and $t_{iv}$ be the first invalid, but still exitable and canonical, transaction in the chain.

$t_{iv}$ must either be a <<glossary:deposit>> transaction or spend some input that didn’t exist when $t_{v}$ was created, otherwise $t_{iv}$ would be valid.
Therefore:

    $$
    \max(I(t_{v})) < \max(I(t_{iv}))
    $$

and therefore by our definition of $p(t)$:

    $$
    p(t_{v}) < p(t_{iv})
    $$

So $p(t_{v})$ will exit before $p(t_{iv})$.
We now need to show that for any $t'$ that stems from $t_{iv}$, $p(t_{v}) < p(t')$ as well.
Because $t'$ stems from $t_{iv}$, we know that:

    $$
    (O(t_{iv}) \cap I(t') \neq \varnothing) \vee (\exists t : stems\_from(t_{iv}, t) \wedge stems\_from(t, t'))
    $$

If the first is true, then we can show $p(t_{iv}) < p(t')$:

    $$
    p(t') = \max(I(t')) \geq \max(I(t') \cap O(t_{iv})) \geq \min(O(t_{iv})) > \max(I(t_{iv})) = p(t_{iv})
    $$

Otherwise, there's a chain of transactions from $p_{iv}$ to $p'$ for which the first is true, and therefore the inequality holds by transitivity.

Therefore, all exiting outputs created by Valid Transaction will exit before any output created by an invalid transaction.

## Transactions and MoreVP protocol
This section provides further technical details for the MoreVP protocol and transactions, and explains transaction-related concepts, such as plasma chain, competing and canonical transactions, and unspent / double-spent transaction inputs. 

### Functions
#### Transactions
$TX$ is the transaction space, where each transaction has $inputs$ and $outputs.
For simplicity, each input and output is an integer that represents the position of that input or output in the Plasma chain.

    $$
    TX: ((I_1, I_2, … ,I_n), (O_1, O_2, … ,O_m))
    $$

For every transaction $t$ in $TX$ we define the “inputs” and “outputs” functions:

    $$
    I(t) = (I_1, I_2, …, I_n)
    O(t) = (O_1, O_2, …, O_m)
    $$

#### Plasma chain
A plasma chain is composed of transactions.


For each Plasma chain $T$, we define a mapping between each transaction position and the corresponding transaction at that position.

    $$
    T_n: [1, n] \rightarrow TX
    $$

We also define a shortcut to point to a specific transaction in the chain.

    $$
    t_i = T_n(i)
    $$

#### Competing transactions and competitors
Two transactions are competing if they have at least one input in common.

    $$
    competing(t, t’) = I(t) \cap I(t’) \neq \varnothing
    $$

The set of competitors to a transaction is therefore every other transaction competing with the transaction in question.

    $$
    competitors(t) = \{ t_{i} : i \in (0, n], competing(t_{i}, t) \}
    $$

#### Canonical transaction
A transaction is referred to as canonical when it is the oldest of all its competitors.

We define a function $first$ that determines which of a set $T$ of transactions is the oldest transaction.

    $$
    first(T) = t \in T : \forall t’ \in T, t \neq t’, min(O(t)) < min(O(t’))
    $$

The set of canonical transactions is any transaction which is the first of all its competitors.

    $$
    canonical(t) = (first(competitors(t)) \stackrel{?}{=} t)
    $$

For convenience, we define $reality$ as the set of all canonical transactions for a given chain.

    $$
    reality(T_{n}) = \{ canonical(t_{i}) : i \in [1, n] \}
    $$

#### Unspent and double-spent

We define two helper functions $unspent$ and $double\_spent$.


$unspent$ takes a set of transactions and returns the list of transaction outputs that haven't been spent.
$double\_spent$ takes a list of transactions and returns any outputs that have been used as inputs to more than one transaction.

First, we define a function $txo$ that takes a transaction and returns a list of its inputs and outputs.

    $$
    txo(t) = O(t) \cup I(t)
    $$

Next, we define a function $TXO$ that lists all inputs and outputs for an entire set of transactions:

    $$
    TXO(T_{n}) = \bigcup_{i = 1}^{n} txo(t_{i})
    $$

Now we can define $unspent$ and $double\_spent$:

    $$
    unspent(T) = \{ o \in TXO(T) : \forall t \in T, o \not\in I(t) \}
    $$

    $$
    double\_spent(T) = \{ o \in TXO(T) : \exists t,t' \in T, t \neq t', o \in I(t) \wedge o \in I(t') \}
    $$

## Transactions and MoreVP
<!-- THIS SHOULD JUST GO TO THE GLOSSARY? -->

This section provides descriptions for some key concepts related to transactions and MoreVP. 

### Deposits
A deposit creates a new output on the Plasma chain.
Although deposits are typically represented as transactions that spend some "special" input, we do not allow deposits to exit via the MoreVP exit protocol. Instead, deposits can be safely exited with the Plasma MVP exit protocol. 

### Spend transaction
A spend transaction is any transaction that spends a UTXO that is already present on the Plasma chain.  

### In-flight transaction
A transaction is considered in-flight if it has been broadcast but has not yet been included in the Plasma chain. A transaction may be in-flight from the perspective of an individual user if that user does not have access to the block in which the transaction is included.  

### Competing transaction, competitors
Two transactions are *competing* if they share at least one input. Competitors to a transaction is the set of all transactions that are competing with the transaction in question, including the transaction itself. 

### Canonical transaction 
A transaction is *canonical* if none of its inputs were previously spent in any other transaction; that is, the transaction is the oldest among all its competitors. 
The definition of *previously spent* depends on whether the transaction in question is included in the Plasma chain.
The position of a transaction in the chain is determined by the tuple (block number, transaction index).
If the transaction was included in the chain, an input to that transaction would be considered previously spent if another transaction also spending the input was included in the chain *before* the transaction in question, decided by transaction position.
If the transaction was not included in the chain, an input to that transaction would be considered previously spent if another transaction also spending the input is *known to exist*.

In this second scenario, it is unimportant whether or not the other transaction is included in the chain:

| Transaction included in the chain? | The other transaction is clearly included before the transaction in question. |
| Other transaction is not included in the chain? | In this case, we can’t tell which transaction *came first*; thus, we simply say that neither is canonical. |

### Exitable transaction
A spend transaction can be called *exitable* if the transaction is correctly formed (e.g. more input value than output value, inputs older than outputs, proper structure) and is properly signed by the owners of the transaction’s inputs.
If a transaction is *exitable*, a user may try to start an exit that references the transaction. 

### Valid transaction
A valid transaction is a spend transaction that is valid if it is exitable, canonical, and only stems from valid transactions; that is, all transactions in the history are also valid transactions.

A transaction is thus considered invalid if even a single invalid transaction is present in its history.

An exitable transaction is not necessarily a valid transaction, but all valid transactions are, by definition, exitable.

Our exit mechanism ensures that all outputs created by valid transactions can process before any output created by an invalid transaction. 




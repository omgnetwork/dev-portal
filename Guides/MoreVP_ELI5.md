# MoreVP Plasma ELI5

Estimated time: 10 minutes

Goal:

- To understand how plasma works as a scaling solution
- To understand plasma architecture from a high level

Plasma is a layer 2 (i.e. off-chain) scaling solution for Ethereum.

The difference between Plasma and other layer 2 solutions is that every block on the plasma (or child) chain is committed to the root chain. This provides the benefit that even if something goes wrong on child chain, honest users will always be able to exit the child chain and recover their funds on the root chain.

There are many different varieties of Plasma, at OmiseGO we've implemented Plasma MoreVP. Different versions of Plasma are better suited to certain use cases, and the operator will choose to implement whichever version is most suitable. From the user's point of view however, all versions of Plasma behave more or less the same.

## Architecture

MoreVP Plasma consists of various components:
- The root chain, Ethereum
- The RootChain contract on Ethereum that allows deposits and exits to and from the child chain.
- The child chain. Currently, in Proof of Authority mode there is only one ChildChain service that implements the child blockchain. This will change in the future when we move to Proof of Stake.
- Watchers. A Watcher is a service that monitors the child chain for suspicious activity, such as the operator or users acting dishonestly. If it discovers any such activity it will prompt users to challenge invalid exits or to exit the child chain. Users can run their own Watcher, but it is also expected that some trusted entity will run Watchers as a service.

## Usage

The typical use of Plasma is as follows:

1. Deposit funds from the root chain (ethereum) into the child chain.
2. Transact on the child chain (sell, trade, transfer, etc.).
3. Exit remaining funds from the child chain back to the root chain.

### Deposits
Depositing involves sending tokens (ETH or any ERC20 token) to the Plasma RootChain contract on Ethereum.

 - To deposit ETH you must call `RootChain.deposit()` and send an amount of ETH along with the transaction
 - To deposit ERC20 tokens, you do not send them directly to the RootChain contract. Instead, you must first approve the RootChain contract to transfer the amount of tokens that you wish to deposit. Then you call `RootChain.depositFrom()` and the contract will transfer the tokens to itself

In both cases the tokens are held in the RootChain contract and, after a finality period (currently 10 blocks), the same amount of corresponding tokens are available at your address on the child chain.

### Transactions
Now that you have tokens on the child chain, you can use them in transactions. In MoreVP, the child chain is a UTXO based blockchain, limited to 4 inputs and 4 outputs per transaction. 

You can submit transactions directly to the ChildChain service via its RPC api, however it is more secure to submit them via the Watcher's API. As previously mentioned, the Watcher can ensure that the child chain is behaving correctly before submitting your transaction.

### Exits
Exiting is the process of taking tokens that you own on the child chain and 'moving' them back out to the root chain.

You must exit each utxo you own separately. It may be beneficial to consolidate your utxos to reduce the number of exits necessary. To exit a utxo you must call `RootChain.startStandardExit()` on Ethereum. You then need to wait for the 'challenge' period (described below). If there are no challenges in this period then the tokens are released from the RootChain contract back to your account.

## The Exit Protocol
The Exit Protocol refers to the process of exit, challenge and response that can occur when exiting. Its purpose is to protect honest users from bad actors on the child chain.

For example, Alice could send Bob tokens on the child chain and then attempt to exit those same tokens, effectively stealing them from the child chain.

To prevent this from happening, Alice’s invalid exit can be challenged. When Alice starts an exit she must put up an exit bond and wait for the challenge period for the exit to be finalized. Meanwhile the Watchers will report that Alice is attempting to exit tokens that she has already spent. Now anyone can challenge Alice’s exit by proving that Alice has already spent the utxo in a transaction. If the challenge is successful, Alice does not exit the tokens and the challenger is awarded the exit bond that Alice put up.

For much more detail on the Exit Protocol, see the [MoreVP document.](https://github.com/omisego/elixir-omg/blob/master/docs/morevp.md)

In MoreVP there are two types of exit; standard and in-flight.

### Standard Exits
A standard exit can be performed by a user who has access to contents of a valid block where their transaction has been included.

### In-flight Exits
MoreVP introduced the concept of in-flight exits, which allow a user to exit an in-flight transaction. A transaction is considered to be "in-flight" if:
it has been broadcast but has not yet been included in the child chain 
or the user does not have access to the block in which the transaction is included, 
or the user does have access to the block, but the block is invalid (due to dishonest operator).

Inflight exits provide extra protection for users with transactions that are in-flight when something goes wrong on the child chain, for example if a dishonest operator withholds blocks.


## Further Reading
For more details see the [Tesuji Blockchain Design](https://github.com/omisego/elixir-omg/blob/master/docs/tesuji_blockchain_design.md) and the [MoreVP](https://github.com/omisego/elixir-omg/blob/master/docs/morevp.md) documents.

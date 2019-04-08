# Transaction fees
Transactions on the child chain incur fees. 

How much fees will cost has yet to be decided, this document only explains how to pay fees.

Transaction fees can only be paid in certain tokens. Currently ETH is always accepted as a fee, in the future more ERC20 tokens will also be accepted.

## How to pay fees
The child chain is a UTXO-based blockchain and fees are paid in a similar way to Bitcoin i.e. the difference between the outputs and the inputs of the transaction is kept by the operator as the fee. 

For example, the following transaction pays a fee of 100 wei:

|Inputs|Outputs|
|--|--|
|`0x01234...`  1000 wei|`0x05678...`  900 wei|

When sending a token that is not accepted as a fee, the fee must be included in the transaction as a separate input. In the following transaction, `0x01234...` sends 4 ERC20 tokens to `0x05678...` (and 6 back to themself in change) and pays a fee of 100 wei.

|Inputs|Outputs|
|--|--|
|`0x01234...`  10 ERC20|`0x05678...`  4 ERC20|
| |`0x01234...`  6 ERC20|
|`0x01234...`  1000 wei|`0x01234...`  900 wei|


### What happens if I don't pay the fee?

If you attempt to submit a transaction that doesn't inlude fees, it will be rejected.
For example, this transaction will be rejected with a `fees_not_covered` error.

|Inputs|Outputs|
|--|--|
|`0x01234...`  10 ERC20|`0x05678...`  4 ERC20|
| |`0x05678...`  6 ERC20|


## Ari testnet fees
Currently, transactions on Ari testnet are free!

So when you're sending ETH you can spend the entire amount of the inputs:

|Inputs|Outputs|
|--|--|
|`0x01234...`  1000 wei|`0x05678...`  1000 wei|


However, the protocol still requires a fee to be present, even if the value of the fee is zero.

This means that if you are sending an ERC20 token, you must still include some ETH in the transaction, sending it back to yourself e.g.

|Inputs|Outputs|
|--|--|
|`0x01234...`  10 ERC20|`0x05678...`  4 ERC20|
| |`0x01234...`  6 ERC20|
|`0x01234...`  1000 wei|`0x01234...`  1000 wei|

